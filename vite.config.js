import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",

    // ── Code splitting — réduit le TBT ──────────────────────────────────
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor React — chargé en premier, mis en cache longtemps
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Pages blog — chargées uniquement sur /observatoire
          "chunk-blog": [
            "./src/pages/Blog.jsx",
            "./src/pages/BlogArticle.jsx",
            "./src/data/blogContent.js",
          ],
          // Pages secondaires — chargées à la demande
          "chunk-pages": [
            "./src/pages/Achat.jsx",
            "./src/pages/Vente.jsx",
            "./src/pages/Location.jsx",
            "./src/pages/Estimation.jsx",
            "./src/pages/PropertyDetail.jsx",
            "./src/pages/Contact.jsx",
          ],
        },
      },
    },

    // Alerter si un chunk dépasse 300kb
    chunkSizeWarningLimit: 300,
  },
});
