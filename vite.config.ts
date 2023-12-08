import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  optimizeDeps: { exclude: ["fsevents"] },
  appType: "custom",
  base: "/",
  ssr: {
    target: "node",
  },
});
