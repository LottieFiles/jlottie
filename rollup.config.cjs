const filesize = require('rollup-plugin-filesize');
const server = require('rollup-plugin-serve');
const { terser } = require('rollup-plugin-terser');
const strip = require('@rollup/plugin-strip');
const { babel } = require('@rollup/plugin-babel');
const copy = require('rollup-plugin-copy');
const livereload = require('rollup-plugin-livereload');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

// Extract the package name from the scoped name in package.json
const pkgName = pkg.name.replace(/^@.*\//u, '');

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 */`;

const devPlugins = (serve) => {
  return !isProduction && serve
    ? [
        // Live reloading
        livereload(),

        // Copy source file to dist/src to reference during dev
        copy({
          targets: [{ src: 'src/jlottie.js', dest: 'dist/src' }],
        }),

        // Serve builds
        server({
          contentBase: ['public', 'dist', 'tests/public/test_files'],
          open: true,
          host: 'localhost',
          port: 8300,
        }),
      ]
    : [];
};

const createConfig = (options) => {
  const { fileExt, format, minify = false, serve = false, transpile = false } = options;

  return {
    input: 'src/jlottie.js',

    treeshake: false,

    output: {
      name: 'jlottie',
      format,
      file: `dist/${pkgName}${fileExt}`,
      banner,
      sourcemap: true,
    },

    plugins: [
      transpile &&
        babel({
          babelHelpers: 'bundled',
        }),

      isProduction && strip(),

      minify && terser(),

      filesize(),

      ...devPlugins(serve),
    ],
  };
};

module.exports = [
  // UMD build for the browser
  {
    fileExt: '.js',
    format: 'umd',
    serve: true,
    transpile: true,
  },

  // Minified UMD build for the browser
  {
    fileExt: '.min.js',
    format: 'umd',
    minify: true,
    transpile: true,
  },

  // CJS build for the browser
  {
    fileExt: '.cjs.js',
    format: 'cjs',
  },

  // Minified CJS build for the browser
  {
    fileExt: '.min.cjs.js',
    format: 'cjs',
    minify: true,
  },

  // ESM build for the browser
  {
    fileExt: '.esm.js',
    format: 'es',
  },

  // Minified ESM build for the browser
  {
    fileExt: '.min.esm.js',
    format: 'es',
    minify: true,
  },
].map((config) => createConfig(config));
