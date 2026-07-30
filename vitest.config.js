import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    include: ['test/services/**/*.{js,ts}'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{js,ts}'],
      thresholds: {
        lines: 90,
      },
    },
  },
});
