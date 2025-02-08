import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    // fixes the issue - The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    resolve: {
      alias: {
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@containers": path.resolve(__dirname, "./src/containers"),
        "@fonts": path.resolve(__dirname, "./src/fonts"),
        "@styles": path.resolve(__dirname, "./src/assets/styles"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    },
    build: {
      outDir: "build",
    },
    plugins: [react(), svgLoader()],
    server: {
      port: 3000,
    },
  };
});
