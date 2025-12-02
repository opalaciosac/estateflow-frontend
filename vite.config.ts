import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Always use an *absolute* path
  const root = path.resolve(__dirname);

  console.log("VITE ROOT:", root);

  const env = loadEnv(mode, root, "VITE_");

  console.log("Loaded env in vite.config:", env);

  return {
    plugins: [react()],
    define: {
      __API_BASE__: JSON.stringify(env.VITE_API_BASE || ""),
    },
    server: {
      proxy: {
        "/api": {
          target:
            env.VITE_API_BASE ||
            "https://estateflow-f7hsgbgmezbyfjfx.eastus-01.azurewebsites.net",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
