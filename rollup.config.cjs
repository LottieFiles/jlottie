const filesize = require('rollup-plugin-filesize');
const server = require('rollup-plugin-serve');
const { terser } = require('rollup-plugin-terser');
const strip = require('@rollup/plugin-strip');
const { babel } = require('@rollup/plugin-babel');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

// Extract the package name from the scoped name in package.json
const pkgName = pkg.name.replace(/^@.*\//u, '');

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 */`;

const createConfig = (options) => {
  const {
    fileExt, format, minify = true, serve = false, transpile = true,
  } = options;

  return {
    input: 'src/jlottie.js',

    treeshake: false,

    output: {
      name: 'jlottie',
      format,
      file: `dist/${pkgName}${fileExt}`,
      banner,
      sourcemap: true,

      // TODO: Remove this after strict-mode complaincy is achieved
      strict: false,
    },

    plugins: [
      transpile && babel({
        babelHelpers: 'bundled',
      }),

      isProduction && strip(),

      minify && terser(),

      filesize(),

      serve
        && server({
          contentBase: ['src', 'dist', 'public'],
          open: true,
          host: 'localhost',
          port: 8100,
        }),
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
