import fs from "node:fs";
import path from "node:path";

// Rebuild the single index from the remaining source specs, never from file mtimes.
const root = path.resolve(import.meta.dirname, "..");
const directory = path.join(root, "specs");
const read = file => fs.readFileSync(file, "utf8");
const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") ? value : "—";
const status = value => /complete|^done$/i.test(value) ? "Done" : /progress/i.test(value) ? "In Progress" : /blocked/i.test(value) ? "Blocked" : "Planned";
const entries = [];
for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
  if (item.isFile() && item.name !== "INDEX.md" && item.name.endsWith(".md")) {
    const source = read(path.join(directory, item.name));
    const meta = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!meta) throw Error(`Missing metadata: ${item.name}`);
    const get = key => meta[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim();
    entries.push({ id: item.name.slice(0, 15), title: get("title"), status: status(get("status")), created: date(get("created")), completed: date(get("completed")), file: item.name, kind: "Task" });
  } else if (item.isDirectory() && fs.existsSync(path.join(directory, item.name, "spec.md"))) {
    const source = read(path.join(directory, item.name, "spec.md"));
    const title = source.match(/^#\s*(?:Feature Specification:\s*)?(.+)$/m)?.[1];
    const state = source.match(/^\*\*Status\*\*:\s*(.+)$/m)?.[1] ?? "Planned";
    entries.push({ id: item.name.slice(0, 15), title, status: status(state), created: date(source.match(/^\*\*Created\*\*:\s*(\d{4}-\d{2}-\d{2})/m)?.[1]), completed: "—", file: `${item.name}/spec.md`, kind: "Feature" });
  }
}
entries.sort((a, b) => (b.completed === "—" ? b.created : b.completed).localeCompare(a.completed === "—" ? a.created : a.completed) || b.id.localeCompare(a.id));
const escape = value => String(value).replaceAll("|", "\\|");
const table = items => ["| ID | Specification | Kind | Status | Created | Completed |", "| --- | --- | --- | --- | --- | --- |", ...items.map(entry => `| ${entry.id} | [${escape(entry.title)}](${entry.file}) | ${entry.kind} | ${entry.status} | ${entry.created} | ${entry.completed} |`)].join("\n");
const sections = ["Done", "In Progress", "Planned", "Blocked"].map(state => `## ${state === "Done" ? "Completed history" : state}\n\n${entries.some(entry => entry.status === state) ? table(entries.filter(entry => entry.status === state)) : "No entries."}`);
const result = `# Specification Index\n\nSingle navigation index for lightweight tasks and feature directories. Current engineering rules and material contracts live in [AGENTS.md](../AGENTS.md) and [MATERIALS.md](../lib/design-system/MATERIALS.md); start retrieval at [docs/RAG.md](../docs/RAG.md). Completed specifications describe decisions at their own revision, not current styling authority.\n\n## Recent\n\n${table(entries.slice(0, 10))}\n\n${sections.join("\n\n")}\n\n## Maintenance\n\n- Source metadata is authoritative. Update task frontmatter or a feature's Created/Status header, then run \`node scripts/update-spec-index.mjs\`.\n- Use \`node scripts/update-spec-index.mjs --check\` to verify synchronization. Do not edit generated tables by hand.\n- New lightweight tasks use YYYYMMDD-HHMMSS-description.md with Asia/Tehran timestamps; feature directories keep spec.md and related artifacts.\n- Dates are never inferred from filesystem modification times. Missing completion dates remain —.\n\n_Generated from ${entries.length} source specifications._\n`;
const target = path.join(directory, "INDEX.md");
if (process.argv.includes("--check")) {
  if (read(target) !== result) throw Error("Specification index is stale; run node scripts/update-spec-index.mjs");
} else fs.writeFileSync(target, result);
process.stdout.write(`Specification index synchronized: ${entries.length} sources.\n`);
