// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      hot: true,
      host: 'localhost',
      port: 10086,
      proxy: {
        '/service': {
          target: 'https://nei.netease.com',
          changeOrigin: true,
          pathRewrite: { '^/service': '' },
        },
      },
    },
  },
};
