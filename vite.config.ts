import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "node:path";

export default defineConfig({
  plugins: [
    tsconfigPaths({ root: './' }),
    react()
  ],
  resolve: {
    alias: {
      '@Panda/*': path.resolve(__dirname, './styled-system'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@ParkComponents/*': path.resolve(__dirname, './src/library/components/park'),
      '@Components/*': path.resolve(__dirname, './src/components'),
    }
  }
})
