import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const typescriptConfig = { cacheRoot: 'tmp/.rpt2_cache' };
const noDeclarationConfig = Object.assign({}, typescriptConfig, {
  tsconfigOverride: { compilerOptions: { declaration: false } }
});
const babelConfig = {
  babelrc: false,
  plugins: ['dev-expression']
};

const common = commonjs({});

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

const config = {
  input: 'src/index.ts',
  external: makeExternalPredicate(deps.concat(peerDeps))
};

const umd = Object.assign({}, config, {
  output: {
    file: 'dist/vue-pose.dev.js',
    format: 'umd',
    name: 'pose',
    exports: 'named',
    globals: { vue: 'Vue' }
  },
  external: ['vue'],
  plugins: [
    common,
    typescript(noDeclarationConfig),
    babel(babelConfig),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});

const umdProd = Object.assign({}, umd, {
  input: 'src/global.ts',
  output: Object.assign({}, umd.output, {
    file: 'dist/vue-pose.js'
  }),
  plugins: [
    common,
    typescript(noDeclarationConfig),
    babel(babelConfig),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  ]
});

const es = Object.assign({}, config, {
  output: {
    file: 'dist/vue-pose.es.js',
    format: 'es',
    exports: 'named'
  },
  plugins: [common, typescript(noDeclarationConfig), babel(babelConfig)]
});

const cjs = Object.assign({}, config, {
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [common, typescript(typescriptConfig), babel(babelConfig)]
});

export default [umd, umdProd, es, cjs];
