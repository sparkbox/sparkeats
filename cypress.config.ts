import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173/sparkeats/',
    // Enables the "Run All Specs" UI feature, allowing the execution of multiple specs sequentially.
    experimentalRunAllSpecs: true
  },
});
