import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": process.env.SERVER_URL,
    },
  },
  plugins: [react()],
});
