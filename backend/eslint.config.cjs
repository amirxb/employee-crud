// backend/eslint.config.cjs
// Minimal ESLint flat config to satisfy ESLint v9+ for backend code.
module.exports = [
  // ignore node_modules
  { ignores: ["node_modules/**"] },

  // Apply to JS files (adjust patterns if you use .mjs/.cjs/.jsx)
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    // use a tiny rule set for now (you can extend later)
    rules: {
      // Example: enable recommended style checks (optional)
      // "no-unused-vars": "warn",
      // "no-console": "off"
    },
  },
];
