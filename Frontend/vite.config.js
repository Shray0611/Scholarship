const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
