const filesize = require('rollup-plugin-filesize');
const serve = require('rollup-plugin-serve');
const { terser } = require('rollup-plugin-terser');
const strip = require('@rollup/plugin-strip');
const { babel } = require('@rollup/plugin-babel');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.env.ROLLUP_WATCH;

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 */`;

// Common plugin configs for all builds
const plugins = [
  babel({
    babelHelpers: 'bundled',
  }),

  isProduction && strip(),

  isProduction && terser(),

  filesize(),
];

module.exports = [
  // UMD build for the browser
  {
    input: 'src/jlottie.js',
    output: {
      name: 'jlottie',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      banner,
    },

    plugins: [
      ...plugins,

      !isProduction
        && isWatch
        && serve({
          contentBase: ['src', 'dist', 'public'],
          open: true,
          host: 'localhost',
          port: 10000,
        }),
    ],
  },

  // CommonJS and ESM build
  {
    input: 'src/jlottie.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        banner,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        banner,
      },
    ],

    plugins,
  },
];
