import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/calculadorareact/",  // ¡Importante! Mismo nombre que tu repositorio.
  plugins: [react()],
});