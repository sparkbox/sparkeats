import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import childProcess from 'child_process'

const latestCommitHash = childProcess 
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trimEnd();

process.env.VITE_SPARKEATS_VERSION = latestCommitHash;

export default defineConfig({
  base: '/sparkeats/',
  plugins: [react()]
})
