import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function pagesBase() {
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (!repoName || process.env.GITHUB_PAGES !== "true") return "./";
  return repoName.endsWith(".github.io") ? "/" : `/${repoName}/`;
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react()],
  build: {
    outDir: "out",
    emptyOutDir: true,
  },
});
