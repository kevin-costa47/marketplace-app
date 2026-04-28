import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Customize the generated class name
      // [name] = filename, [local] = class name, [hash] = unique string
      generateScopedName: "[name]__[local]___[hash:base64:5]",

      // Whether to export class names in camelCase (e.g., .main-nav -> styles.mainNav)
      localsConvention: "camelCaseOnly",
      scopeBehaviour: "local",
    },
  },
  resolve: {
    // This tells Vite to automatically use the "paths" from your tsconfig
    tsconfigPaths: true,
  },
});
