import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["**/*.tsx"], rules: { "max-lines": ["error", { max: 200, skipBlankLines: false, skipComments: false }] } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "ds-bundle/**", // Generated distributable already excluded by .gitignore.
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
