import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config();

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/services/**/*.{js,ts}'],
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'html'],
      include: ['src/**/*.{js,ts}'],
      thresholds: {
        lines: 90,
      },
    },
  },
});
