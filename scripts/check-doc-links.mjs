import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(item => {
  const file = path.join(directory, item.name);
  return item.isDirectory() ? walk(file) : file.endsWith(".md") ? [file] : [];
});
const files = [path.join(root, "AGENTS.md"), path.join(root, "README.md"), ...walk(path.join(root, "docs")), ...walk(path.join(root, "specs"))];
const failures = [];
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim().replace(/^<|>$/g, "").split("#")[0];
    if (!target || /^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith("//")) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), decodeURIComponent(target)))) failures.push(`${path.relative(root, file)} -> ${target}`);
  }
}
if (failures.length) { process.stderr.write(failures.join("\n") + "\n"); process.exitCode = 1; }
else process.stdout.write(`Checked local links in ${files.length} documentation files.\n`);
