const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#d45d02',
              '@layout-footer-background': '#d45d02',
              '@layout-header-background': '#ffffff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://kovan-test.sashimi.cool',
        target: 'https://sashimi.cool',
        changeOrigin: true,
        secure: true
      }
    }
  },
  webpack: {
    devServer: {
      hot: false,
      inline: false,
      reload: false,
    }
  },
  babel: {
    plugins: [
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ]
    ]
  },
};
