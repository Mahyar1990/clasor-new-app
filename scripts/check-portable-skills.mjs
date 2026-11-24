import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../skills/", import.meta.url));
const root = path.resolve(process.argv[2] ?? sourceRoot);
const names = ["client-refactor", "glass-design-system", "clasor-product-patterns", "design-system-parity-audit"];
const failures = [];
let checked = 0;

function inspect(directory, packageRoot) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      failures.push(`${file}: symbolic link prevents a self-contained copy`);
    } else if (entry.isDirectory()) {
      inspect(file, packageRoot);
    } else if (entry.name.endsWith(".md")) {
      checked += 1;
      const source = fs.readFileSync(file, "utf8");
      for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
        const target = match[1].trim().replace(/^<|>$/g, "").split("#")[0];
        if (!target || /^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith("//")) continue;
        const destination = path.resolve(path.dirname(file), decodeURIComponent(target));
        const relative = path.relative(packageRoot, destination);
        if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
          failures.push(`${file}: reference leaves the skill package: ${target}`);
        } else if (!fs.existsSync(destination)) {
          failures.push(`${file}: missing reference: ${target}`);
        }
      }
    }
  }
}

for (const name of names) {
  const directory = path.join(root, name);
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
