import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // VS Code dev-tunnel URLs use a per-tunnel subdomain.
    allowedHosts: [".devtunnels.ms"],
  },
});
