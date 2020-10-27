const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const bundleAnalyzer = require('webpack-bundle-analyzer');
const DevEnv = require('./config/prod.env');
const ProEnv = require('./config/dev.env');
module.exports = {
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    https: false,
    hotOnly: false,
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap'
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 144
          })
        ]
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        return [{ 'process.env': process.env.NODE_ENV === 'production' ? DevEnv : ProEnv }];
      });
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(bundleAnalyzer.BundleAnalyzerPlugin);
    config.when(process.env.NODE_ENV === 'production', () => {
      config.module.rule('css').oneOf('vue').use('vue-style-loader').clear();
      config.plugin('gzip')
        .use(CompressionWebpackPlugin, [{
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8
        }])
        .end();
      config.module.rule('css')
        .oneOf('vue')
        .use('vue-style-loader')
        .loader(MiniCssExtractPlugin.loader);
    });
  }
};
