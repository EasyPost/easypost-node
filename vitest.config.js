import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/services/**/*.{js,ts}'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{js,ts}'],
    },
  },
});
