import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     "/product-documents": {
  //       target: "https://reproquodevuksouth.blob.core.windows.net",
  //       changeOrigin: true,
  //       secure: true,
  //       rewrite: (path) => path.replace(/^\/product-documents/, ""),
  //       configure: (proxy, options) => {
  //         proxy.on("proxyRes", (proxyRes, req, res) => {
  //           if (proxyRes.headers["content-type"]?.includes("octet-stream")) {
  //             proxyRes.headers["content-type"] = "application/pdf";
  //           }
  //         });
  //       },
  //     },
  //   },
  // },
  server: {
    proxy: {
      "/product-documents": {
        target: "https://reproquodevuksouth.blob.core.windows.net",
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/product-documents/, "/product-documents"),
      },
    },
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
});
