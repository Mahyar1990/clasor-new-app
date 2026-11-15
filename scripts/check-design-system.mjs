import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const write = process.argv.includes("--write");
const files = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? files(file) : file.endsWith(".tsx") ? [file] : [];
});
const targets = [...files("components"), ...files("app")];
const failures = [];
let inserted = 0;
for (const file of targets) {
  const source = fs.readFileSync(file, "utf8");
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];
  let ordinal = 0;
  const visit = node => {
    if (ts.isCallExpression(node) && node.expression.getText(tree) === "mergeProps" && ts.isObjectLiteralExpression(node.arguments[0])) {
      const defaults = node.arguments[0];
      if (!defaults.getText(tree).includes('"data-test-id"')) {
        if (write) {
          let owner = node.parent;
          while (owner && !ts.isFunctionDeclaration(owner)) owner = owner.parent;
          const id = (owner?.name?.text ?? path.basename(file, ".tsx")).replace(/[A-Z]/g, (letter, index) => `${index ? "-" : ""}${letter.toLowerCase()}`);
          edits.push({ at: defaults.getStart(tree) + 1, text: ` ...{ "data-test-id": ${JSON.stringify(id)} },` });
        } else failures.push(`${file}: missing test ID on merged render props`);
      }
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(tree);
      const publicId = node.attributes.properties.find(attr => ts.isJsxAttribute(attr) && attr.name.text === "data-test-id");
      const render = node.attributes.properties.find(attr => ts.isJsxAttribute(attr) && attr.name.text === "render");
      const rendered = render?.initializer && ts.isJsxExpression(render.initializer) ? render.initializer.expression : undefined;
      const renderedOpening = rendered && (ts.isJsxElement(rendered) ? rendered.openingElement : ts.isJsxSelfClosingElement(rendered) ? rendered : undefined);
      const renderedId = renderedOpening?.attributes.properties.find(attr => ts.isJsxAttribute(attr) && attr.name.text === "data-test-id");
      if (publicId?.initializer && renderedId?.initializer && publicId.initializer.getText(tree) !== renderedId.initializer.getText(tree)) {
        if (write) edits.push({ at: renderedId.initializer.getStart(tree), end: renderedId.initializer.end, text: publicId.initializer.getText(tree) });
        else failures.push(`${file}: rendered element overrides its public test ID`);
      }
      const native = /^[a-z]/.test(tag);
      const inputType = node.attributes.properties.find(attr => ts.isJsxAttribute(attr) && attr.name.text === "type");
      const plainType = inputType?.initializer && ts.isStringLiteral(inputType.initializer) ? inputType.initializer.text : "text";
      if ((tag === "textarea" || tag === "input" && !["checkbox", "radio", "hidden"].includes(plainType)) && !node.attributes.properties.some(attr => ts.isJsxAttribute(attr) && attr.name.text === "data-slot")) {
        if (write) edits.push({ at: node.tagName.end, text: ` data-slot="${tag === "textarea" ? "textarea" : "input"}"` });
        else failures.push(`${file}: native text field is missing its shared material hook`);
      }
      const leaf = /(?:Button|Input|Trigger|Close|Link|Checkbox|RadioGroupItem|Switch|SelectItem|TextField|SearchField|TextareaField|SelectField)$/.test(tag);
      const part = tag.includes(".") && !/\.(Root|Provider|Fragment)$/.test(tag);
      if (native || leaf || part) {
        ordinal++;
        if (tag === "select") failures.push(`${file}: native select is forbidden`);
        if (!node.attributes.properties.some(attr => ts.isJsxAttribute(attr) && attr.name.getText(tree) === "data-test-id")) {
          if (write) {
            const prefix = `${path.basename(file, ".tsx")}-${tag.replaceAll(".", "-").toLowerCase()}-${ordinal}`;
            let parent = node, key;
            while (parent && !key) {
              const opening = ts.isJsxElement(parent) ? parent.openingElement : ts.isJsxSelfClosingElement(parent) ? parent : undefined;
              key = opening?.attributes.properties.find(attr => ts.isJsxAttribute(attr) && attr.name.text === "key");
              parent = parent.parent;
            }
            const expression = key?.initializer && ts.isJsxExpression(key.initializer) && key.initializer.expression;
            const dynamic = expression && (ts.isIdentifier(expression) || ts.isPropertyAccessExpression(expression) || ts.isElementAccessExpression(expression));
            const value = dynamic ? `{\`${prefix}-\${String(${expression.getText(tree)})}\`}` : JSON.stringify(prefix);
            edits.push({ at: node.tagName.end, text: ` data-test-id=${value}` });
          } else failures.push(`${file}:${tree.getLineAndCharacterOfPosition(node.pos).line + 1}: missing data-test-id on ${tag}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  if (source.split(/\r?\n/).length - Number(source.endsWith("\n")) > 200) failures.push(`${file}: exceeds 200 physical lines`);
  if (/rounded-(?:2xl|3xl)\b/.test(source)) failures.push(`${file}: excessive corner radius`);
  if (/(?:^|[\s"':])(?:-?(?:left|right)|ml|mr|pl|pr)-|text-(?:left|right)\b/m.test(source)) failures.push(`${file}: physical directional utility; use logical RTL classes`);
  if (/eslint-disable[^\n]*max-lines/.test(source)) failures.push(`${file}: max-lines bypass`);
  if (write && edits.length) {
    let result = source;
    for (const edit of edits.sort((a, b) => b.at - a.at)) result = result.slice(0, edit.at) + edit.text + result.slice(edit.end ?? edit.at);
    fs.writeFileSync(file, result);
    inserted += edits.length;
  }
}
if (failures.length) { process.stderr.write(failures.join("\n") + "\n"); process.exitCode = 1; }
else process.stdout.write(`Checked ${targets.length} React files: line limits, test IDs, RTL, radius and Select policy.${write ? ` Updated ${inserted} attributes.` : ""}\n`);
