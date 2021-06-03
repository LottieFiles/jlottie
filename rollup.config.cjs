const filesize = require('rollup-plugin-filesize');
const serve = require('rollup-plugin-serve');
const { terser } = require('rollup-plugin-terser');
//const { minify } = require('rollup-plugin-terser');
const strip = require('@rollup/plugin-strip');

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.env.ROLLUP_WATCH;

module.exports = {
  input: './src/lottie-player.js',

  output: [
    {
      file: './dist/lottie-player.mjs',
      format: 'es',
      sourcemap: true,
    },
    {
      file: './dist/lottie-player.js',
      format: 'umd',
      name: 'lottie-player',
      sourcemap: true,
    },
  ],

  plugins: [
    // Disabled for now...
    // babel({
    //  babelHelpers: 'runtime',
    // }),

    isProduction && strip(),

    isProduction && terser(),

    filesize(),

    !isProduction
      && isWatch
      && serve({
        contentBase: ['dist', 'public'],
        open: true,
        host: 'localhost',
        port: 10000,
      }),
  ],
};
