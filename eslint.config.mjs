import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node, // Node.js global variables
        ...globals.jest, // Jest global variables
      },
      ecmaVersion: "latest",
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
];
