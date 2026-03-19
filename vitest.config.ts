import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup-test-db.ts', './tests/setup-db.ts'],
    testTimeout: 10000,
    clearMocks: true,
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['workspace/**', 'node_modules/**'],
    maxWorkers: 1,
    isolate: false,
  },
})
