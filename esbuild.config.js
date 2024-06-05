// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './dist/bundle.js',
  sourcemap: true,
  watch: true,
  platform: 'browser',
}).catch(() => process.exit(1));