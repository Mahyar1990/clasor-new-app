import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("../skills/", import.meta.url));
const checker = fileURLToPath(new URL("../scripts/check-portable-skills.mjs", import.meta.url));

function copyPackages(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "clasor-skills-test-"));
  fs.cpSync(source, directory, { recursive: true });
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function check(directory) {
  return spawnSync(process.execPath, [checker, directory], { encoding: "utf8" });
}

function append(directory, markdown) {
  fs.appendFileSync(path.join(directory, "client-refactor/SKILL.md"), "\n" + markdown + "\n");
}

test("portable packages can be copied away from the source checkout", t => {
  const result = check(copyPackages(t));
  assert.equal(result.status, 0, result.stderr);
});

test("portable resource checks reject inline missing files", t => {
  const directory = copyPackages(t);
  append(directory, "[Missing](references/missing.md)");
  const result = check(directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing reference/);
});

test("reference-style links are checked for missing and outside resources", t => {
  const directory = copyPackages(t);
  append(directory, "[Missing][missing]\n[Outside][outside]\n\n[missing]: references/missing.md\n[outside]: ../outside.md");
  const result = check(directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing reference/);
  assert.match(result.stderr, /reference leaves the skill package/);
});

test("reference labels support case and whitespace normalization", t => {
  const directory = copyPackages(t);
  append(directory, "[Valid][Local   Policy]\n[local policy]: references/adoption.md");
  const result = check(directory);
  assert.equal(result.status, 0, result.stderr);
});

test("undefined labels and malformed URI encoding report validation failures", t => {
  const directory = copyPackages(t);
  append(directory, "[Undefined][no definition]\n[Malformed](references/%ZZ.md)");
  const result = check(directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /undefined reference label/);
  assert.match(result.stderr, /invalid encoded reference/);
});

test("symbolic links at the package root cannot bypass portable checks", t => {
  const directory = copyPackages(t);
  const packagePath = path.join(directory, "client-refactor");
  const linkedPath = path.join(directory, "external-package");
  fs.renameSync(packagePath, linkedPath);
  fs.symlinkSync(linkedPath, packagePath);
  const result = check(directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /symbolic link prevents a self-contained copy/);
});

test("nested symbolic links are rejected and an omitted package is reported", t => {
  const directory = copyPackages(t);
  const references = path.join(directory, "client-refactor/references");
  fs.symlinkSync(path.join(references, "adoption.md"), path.join(references, "linked-policy.md"));
  fs.rmSync(path.join(directory, "design-system-parity-audit"), { recursive: true });
  const result = check(directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /symbolic link prevents a self-contained copy/);
  assert.match(result.stderr, /expected SKILL.md and agents\/openai.yaml/);
});
