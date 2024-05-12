/// <reference types="vitest" />

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      include: ["src/**/*"],
      exclude: ["src/components/ui/**/*"],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: './test/setup.ts',
  }
});
