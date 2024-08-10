const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.js'], // Your entry point file
  bundle: true,
  outfile: 'dist/bundle.js', // Output file
  loader: {
    '.js': 'jsx', // Handle JSX in JS files
    '.jsx': 'jsx', // Handle JSX in JSX files
    '.gif': 'file', // Handle GIF files by copying them
    '.png': 'file', // Handle PNG files
    '.jpg': 'file', // Handle JPG files
    '.svg': 'file', // Handle SVG files
  },
  minify: true, // Optional: to minify the output
  sourcemap: true, // Optional: to generate source maps
}).catch(() => process.exit(1));
