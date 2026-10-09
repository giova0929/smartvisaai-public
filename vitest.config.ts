import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["examples/preflight-filter/**/*.test.ts"],
  },
});
