import dts from "vite-plugin-dts";
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

// https://github.com/jasonsturges/vite-typescript-npm-package

export default defineConfig({
  base: "./",
  plugins: [dts({ rollupTypes: true })],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: Object.keys(packageJson.devDependencies || {}),
    },
  },
});
