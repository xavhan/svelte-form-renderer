import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import css from 'rollup-plugin-import-css';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: production,
    },
  ],
  plugins: [
    commonjs(),
    typescript(),
    svelte({
      dev: !production,
      preprocess: autoPreprocess(),
    }),
    resolve({
      dedupe: [
        'svelte',
      ],
    }),
    css(),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
