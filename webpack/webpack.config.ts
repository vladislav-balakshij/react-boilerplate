import webpack from 'webpack';
import { generateConfig as generateBasicConfig, moduleRules, STATIC_DIR } from './constants';
import { IEnvironment } from './types';

const DEV_SERVER_HOST = 'localhost';
const DEV_SERVER_PORT = 3000;

export default (env: IEnvironment): webpack.Configuration => {
  const basicConfig = generateBasicConfig(env) || {};
  const { module: basicConfigModule = {} as webpack.Module } = basicConfig;

  const entry = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
    'webpack/hot/dev-server',
  ];

  if (Array.isArray(basicConfig.entry)) {
    entry.push(...basicConfig.entry);
  }

  return {
    ...basicConfig,
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry,
    devServer: {
      hot: true,
      historyApiFallback: true,
      watchContentBase: true,
      disableHostCheck: true,
      compress: true,
      overlay: true,
      open: true,
      host: DEV_SERVER_HOST,
      contentBase: STATIC_DIR,
      publicPath: `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      public: `${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      port: DEV_SERVER_PORT,
    },
    module: {
      rules: [
        ...basicConfigModule.rules,
        {
          ...moduleRules.cssLoader,
          use: [
            'css-hot-loader',
            'style-loader',
            ...moduleRules.cssLoader.use as webpack.RuleSetUseItem[],
          ],
        },
        {
          ...moduleRules.scssLoader,
          use: [
            'css-hot-loader',
            'style-loader',
            ...moduleRules.scssLoader.use as webpack.RuleSetUseItem[],
          ],
        },
      ],
    },

    plugins: [
      ...basicConfig.plugins || [],
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};
