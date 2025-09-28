import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ajusta la URL según donde corra tu Azure Function local
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:7071", 
    },
  },
});