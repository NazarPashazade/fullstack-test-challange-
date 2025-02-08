// eslint.config.js
const eslintPluginTS = require("@typescript-eslint/eslint-plugin");
const eslintPluginReactHooks = require("eslint-plugin-react-hooks");
const eslintPluginUnusedImports = require("eslint-plugin-unused-imports");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginPrettier = require("eslint-plugin-prettier");
const path = require("path");

module.exports = [
  {
    files: ["src/**/*.ts", "src/**/*.tsx"], // Include TypeScript files

    ignores: ["node_modules"], // Ignore node_modules

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: [path.resolve(__dirname, "./tsconfig.json"), path.resolve(__dirname, "./tsconfig.node.json")],
        tsconfigRootDir: __dirname,
      },
    },

    plugins: {
      "@typescript-eslint": eslintPluginTS,
      "react-hooks": eslintPluginReactHooks,
      "unused-imports": eslintPluginUnusedImports,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        typescript: {
          project: [path.resolve(__dirname, "./tsconfig.json"), path.resolve(__dirname, "./tsconfig.node.json")],
        },
      },
    },

    rules: {
      // General ESLint rules
      "no-console": "off",

      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/camelcase": "off",

      // React-specific rules
      "react/prop-types": "off",
      "react/display-name": "off",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import plugin rules
      "import/no-unresolved": ["off", { commonjs: true, amd: true }],
      "import/namespace": 2,
      "import/default": 2,
      "import/export": 2,
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", ["sibling", "parent"], "index", "object"],
          "newlines-between": "always",
        },
      ],

      // Prettier plugin rule
      "prettier/prettier": [
        "error",
        { semi: true, trailingComma: "all", singleQuote: false, printWidth: 120, tabWidth: 2 },
      ],
    },
  },
];
