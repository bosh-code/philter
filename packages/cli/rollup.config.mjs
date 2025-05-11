import buble from '@rollup/plugin-buble';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import createBubleConfig from 'buble-config-rhino';

const config = {
  external: ['kolmafia', 'philter.util.ash', 'zlib.ash'],
  input: 'src/index.ts',
  output: {
    file: '../../release/scripts/philter.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    typescript({
      declaration: false,
      // Don't generate source maps (Rhino doesn't support them anyway)
      sourceMap: false,
      tsconfig: 'src/tsconfig.json'
    }),
    buble(createBubleConfig())
  ],
  treeshake: {
    moduleSideEffects: (id) => id !== 'philter.util.ash'
  }
};

export default config;
