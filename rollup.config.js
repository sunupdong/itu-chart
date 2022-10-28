import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js', // 打包入口
  output: [
    {
      file: 'lib/chart.js', // 对于 Nodejs，打包成 commonjs
      format: 'cjs',
    },
    {
      file: 'esm/chart.js', // 对于浏览器，打包成 ES module
      format: 'es',
    },
    {
      file: 'dist/chart.min.js',
      name: 'sp',
      format: 'umd', // 对于 Nodejs 和浏览器，打包成混合模式
    },
  ],
  plugins: [
    resolve(),
    babel(),
  ],
};
