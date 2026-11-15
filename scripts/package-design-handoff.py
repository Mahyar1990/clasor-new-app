"""Package the local design handoff; does not build or publish the application."""
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / ".codex/exports/clasor-design-handoff-v0.3.zip"
FIXED_TIMESTAMP = (2026, 11, 1, 0, 0, 0)
paths = {
    ROOT / "docs/DESIGN_HANDOFF.md",
    ROOT / "docs/USABILITY_TEST.md",
    ROOT / "docs/RAG.md",
    ROOT / "specs/INDEX.md",
    ROOT / "scripts/package-design-handoff.py",
    ROOT / "sample.webp",
}
for directory, pattern in [
    ("components", "*"),
    ("app/design-assets", "*.ttf"),
    ("lib/design-system", "*"),
    ("specs", "*.md"),
    (".codex/qa-workspace-v02", "*.png"),
    (".codex/qa-wireframes-v02", "*.png"),
    (".codex/qa-usability-v02", "*.png"),
]:
    paths.update(path for path in (ROOT / directory).rglob(pattern) if path.is_file())

files = {}
for path in sorted(paths):
    if path.is_symlink() or not path.resolve().is_relative_to(ROOT):
        raise ValueError(f"Unexpected input outside the handoff: {path.name}")
    files[path.relative_to(ROOT).as_posix()] = path.read_bytes()

# All local links from the central guide must resolve inside this same package.
guide_path = ROOT / "docs/DESIGN_HANDOFF.md"
for target in re.findall(r"\]\(([^)]+)\)", files["docs/DESIGN_HANDOFF.md"].decode("utf-8")):
    if "://" in target or target.startswith("#"):
        continue
    relative = (guide_path.parent / target.split("#")[0]).resolve().relative_to(ROOT).as_posix()
    if relative not in files:
        raise ValueError(f"Guide link absent from package: {target}")

manifest = {
    "version": "0.3",
    "handoff_date": "2026-11-01",
    "source_revision": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
    "source_revision_note": "Product baseline at packaging time; packaged documentation may be uncommitted. File hashes identify the exact delivered bytes.",
    "scope": "Design documentation, reference library and selected mock UI evidence; not a runnable Next.js application.",
    "human_usability_sessions_recorded": 0,
    "files": [{"path": name, "bytes": len(data), "sha256": sha256(data).hexdigest()} for name, data in files.items()],
}
files["manifest.json"] = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(OUTPUT, "w", compression=ZIP_DEFLATED) as archive:
    for name, data in files.items():
        info = ZipInfo(name, FIXED_TIMESTAMP)
        info.compress_type = ZIP_DEFLATED
        archive.writestr(info, data)

with ZipFile(OUTPUT) as archive:
    if archive.testzip() is not None or set(archive.namelist()) != set(files):
        raise ValueError("Invalid archive contents")
    for entry in manifest["files"]:
        data = archive.read(entry["path"])
        if len(data) != entry["bytes"] or sha256(data).hexdigest() != entry["sha256"]:
            raise ValueError(f"Checksum mismatch: {entry['path']}")
print(json.dumps({"output": OUTPUT.relative_to(ROOT).as_posix(), "files": len(files), "bytes": OUTPUT.stat().st_size, "sha256": sha256(OUTPUT.read_bytes()).hexdigest(), "checks": "central guide links, ZIP CRC, exact membership and all file checksums passed"}))
