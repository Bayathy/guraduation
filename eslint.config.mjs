import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import simpleImport from "eslint-plugin-simple-import-sort";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "eslint.config.mjs",
      "eslint.config.js",
      "node_modules/",
      ".next",
    ],
  },
  {
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
      ["import"]: importPlugin,
      ["simple-import-sort"]: simpleImport,
      ["tailwindcss"]: tailwindPlugin,
      ["@next/next"]: nextPlugin,
      ["unused-imports"]: unusedImports,
    },
  },

  eslint.configs.recommended,
  ...tailwindPlugin.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      "import/consistent-type-specifier-style": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-absolute-path": "error",
      "import/no-amd": "error",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      "import/no-named-default": "error",
      "import/no-named-export": "off",
      "import/no-self-import": "error",
      "import/prefer-default-export": "off",
      "simple-import-sort/imports": "error",

      "@typescript-eslint/no-unused-vars": "off",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  }
);
