import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // The 3D chunk (three + R3F) is lazy-loaded and ~250 KB gzip; the warning
    // threshold is raised so only genuinely unexpected growth is flagged.
    chunkSizeWarningLimit: 950,
    rolldownOptions: {
      onLog(level, log, handler) {
        // lucide-react ships a harmless "use client" directive
        if (log.code === 'MODULE_LEVEL_DIRECTIVE') return;
        handler(level, log);
      },
    },
  },
});
