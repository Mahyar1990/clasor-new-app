import { readFile, writeFile } from "node:fs/promises";

const source = new URL("../lib/design-system/tokens.json", import.meta.url);
const destination = new URL("../lib/design-system/tokens.css", import.meta.url);
const tokens = JSON.parse(await readFile(source, "utf8"));
const entries = new Map();

function collect(node, path = []) {
  if (node && typeof node === "object" && "$value" in node) {
    entries.set(path.join("."), node);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith("$")) collect(value, [...path, key]);
  }
}

const variable = (path) => `--clasor-${path.replaceAll(".", "-").replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;

function resolve(path, chain = []) {
  if (chain.includes(path)) throw new Error(`Circular token reference: ${[...chain, path].join(" -> ")}`);
  const token = entries.get(path);
  if (!token) throw new Error(`Unknown token: ${path}`);
  const value = token.$value;
  if (typeof value === "string" && value.startsWith("{")) {
    const match = /^\{([^{}]+)\}$/.exec(value);
    if (!match) throw new Error(`Invalid token reference: ${path}`);
    const target = entries.get(match[1]);
    if (target?.$type !== token.$type) throw new Error(`Incompatible token reference: ${path}`);
    resolve(match[1], [...chain, path]);
    return `var(${variable(match[1])})`;
  }
  switch (token.$type) {
    case "color":
      if (!/^#[\da-f]{6}$/i.test(value)) throw new Error(`Invalid color: ${path}`);
      return value;
    case "dimension":
    case "duration":
      if (!Number.isFinite(value.value) || !["px", "ms"].includes(value.unit)) throw new Error(`Invalid dimension: ${path}`);
      return `${value.value}${value.unit}`;
    case "fontFamily":
      return value.map((family) => family === "sans-serif" ? family : JSON.stringify(family)).join(", ");
    case "number":
    case "fontWeight":
      if (!Number.isFinite(value)) throw new Error(`Invalid number: ${path}`);
      return String(value);
    default:
      throw new Error(`Unsupported token type: ${token.$type}`);
  }
}

collect(tokens);
const declarations = [...entries.keys()].map((path) => `  ${variable(path)}: ${resolve(path)};`);
const css = `/* Generated from lib/design-system/tokens.json. Run npm run tokens:generate. */\n:root {\n${declarations.join("\n")}\n}\n\n@theme {\n  --breakpoint-sm: ${resolve("layout.breakpoint.mobile")};\n  --breakpoint-lg: ${resolve("layout.breakpoint.tablet")};\n}\n`;
if (process.argv.includes("--check")) {
  if (await readFile(destination, "utf8") !== css) throw new Error("Generated design tokens are stale. Run npm run tokens:generate.");
  console.log(`Checked ${entries.size} tokens and their references.`);
} else {
  await writeFile(destination, css);
  console.log(`Generated ${entries.size} tokens.`);
}
