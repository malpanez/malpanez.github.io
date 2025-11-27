export default [
  {
    files: ["**/*.js"],
    ignores: ["**/*.min.js", "node_modules/"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        IntersectionObserver: "readonly",
        fetch: "readonly",
        URL: "readonly",
        location: "readonly",
        performance: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
        caches: "readonly",
        self: "readonly",
        clients: "readonly",
        addEventListener: "readonly",
        importScripts: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "error"
    }
  }
];
