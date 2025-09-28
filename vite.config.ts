import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// URL = Azure Function in local
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:7071", 
    },
  },
});