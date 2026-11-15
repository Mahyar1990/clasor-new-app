import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const directory = path.join(root, "lib/design-system");
const allowed = new Set(["tokens.css", "theme.css"]);
for (const name of fs.readdirSync(directory).filter(file => file.endsWith(".css"))) {
  if (!allowed.has(name)) throw Error(`Component stylesheet ${name} belongs in a Tailwind contract, not lib/design-system`);
  const css = fs.readFileSync(path.join(directory, name), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const block of css.matchAll(/\{([^{}]*)\}/g)) {
    for (const declaration of block[1].split(";").map(value => value.trim()).filter(Boolean)) {
      if (!declaration.startsWith("--") && !declaration.startsWith("color-scheme:")) throw Error(`${name}: component rule must be migrated to Tailwind: ${declaration}`);
    }
  }
}
const globals = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
for (const match of globals.matchAll(/@import\s+"\.\.\/lib\/design-system\/([^"\n]+)"/g)) {
  if (!allowed.has(match[1])) throw Error(`Retired stylesheet import: ${match[1]}`);
}
process.stdout.write("Style contracts checked: generated tokens and theme variables only; component styles use Tailwind.\n");
