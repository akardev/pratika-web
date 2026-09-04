import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "public/**",
    "scratch/**",
    "next-env.d.ts",
    "src/data/*.backup.*",
    "src/data/*.generated.*",
    "src/data/todayInHistory.generated.ts",
  ]),
]);

export default eslintConfig;
