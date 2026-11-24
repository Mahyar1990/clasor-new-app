import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../skills/", import.meta.url));
const root = path.resolve(process.argv[2] ?? sourceRoot);
const names = ["client-refactor", "glass-design-system", "clasor-product-patterns", "design-system-parity-audit"];
const failures = [];
let checked = 0;

function checkTarget(target, file, packageRoot) {
  const resource = target.trim().replace(/^<|>$/g, "").split("#")[0];
  if (!resource || /^[a-z][a-z\d+.-]*:/i.test(resource) || resource.startsWith("//")) return;
  let decoded;
  try {
    decoded = decodeURIComponent(resource);
  } catch {
    failures.push(`${file}: invalid encoded reference: ${resource}`);
    return;
  }
  const destination = path.resolve(path.dirname(file), decoded);
  const relative = path.relative(packageRoot, destination);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    failures.push(`${file}: reference leaves the skill package: ${resource}`);
  } else if (!fs.existsSync(destination)) {
    failures.push(`${file}: missing reference: ${resource}`);
  }
}

function inspectMarkdown(file, packageRoot) {
  const source = fs.readFileSync(file, "utf8");
  const definitions = new Set();
  const normalize = label => label.trim().replace(/\s+/g, " ").toLowerCase();
  for (const match of source.matchAll(/^[ \t]{0,3}\[([^\]]+)\]:[ \t]*(<[^>]+>|\S+)/gm)) {
    definitions.add(normalize(match[1]));
    checkTarget(match[2], file, packageRoot);
  }
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    checkTarget(match[1], file, packageRoot);
  }
  for (const match of source.matchAll(/!?\[([^\]]+)\]\[([^\]]*)\]/g)) {
    const label = normalize(match[2] || match[1]);
    if (!definitions.has(label)) failures.push(`${file}: undefined reference label: ${label}`);
  }
}

function inspect(directory, packageRoot) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      failures.push(`${file}: symbolic link prevents a self-contained copy`);
    } else if (entry.isDirectory()) {
      inspect(file, packageRoot);
    } else if (entry.name.endsWith(".md")) {
      checked += 1;
      inspectMarkdown(file, packageRoot);
    }
  }
}

for (const name of names) {
  const directory = path.join(root, name);
  const entry = fs.lstatSync(directory, { throwIfNoEntry: false });
  if (entry?.isSymbolicLink()) {
    failures.push(`${name}: symbolic link prevents a self-contained copy`);
    continue;
  }
  const required = ["SKILL.md", "agents/openai.yaml"];
  if (!required.every(file => fs.existsSync(path.join(directory, file)))) {
    failures.push(`${name}: expected SKILL.md and agents/openai.yaml`);
    continue;
  }
  inspect(directory, directory);
}

if (failures.length) {
  process.stderr.write(failures.join("\n") + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write(`Checked ${names.length} portable skill packages and ${checked} Markdown files.\n`);
}
