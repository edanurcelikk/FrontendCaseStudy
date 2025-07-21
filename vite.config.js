import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Source: path.resolve(__dirname, "src/"),
      Components: path.resolve(__dirname, "src/components"),
      Navbar: path.resolve(__dirname, "src/components/navbar"),
      Product: path.resolve(__dirname, "src/components/product"),
      Assets: path.resolve(__dirname, "src/assets"),
      Context: path.resolve(__dirname, "src/context"),
      Services: path.resolve(__dirname, "src/services"),
      Constants: path.resolve(__dirname, "src/constants"),
      Basket: path.resolve(__dirname, "src/components/basket"),
      DeleteModal: path.resolve(__dirname, "src/components/deleteModal"),
      SearchInput: path.resolve(__dirname, "src/components/searchInput"),
      Filter: path.resolve(__dirname, "src/components/filter"),
      Views: path.resolve(__dirname, "src/views"),
      Pagination: path.resolve(__dirname, "src/components/pagination"),
      CardContent: path.resolve(__dirname, "src/components/cardContent"),
      Select: path.resolve(__dirname, "src/components/select"),
      Button: path.resolve(__dirname, "src/components/button"),
    },
  },
});
