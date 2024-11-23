import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "node:path";
import { config } from 'dotenv';
config()

export default defineConfig({
  define: {
    "process.env": process.env,
  },
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
