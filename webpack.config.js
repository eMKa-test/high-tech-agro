const DEV_MODE = (process.env.NODE_ENV !== "production");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const flexBugsFix = require("postcss-flexbugs-fixes");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const packageJson = require("./package.json");

const SRC_DIR = path.resolve(__dirname, "src");
const DIST = path.resolve(__dirname, "public_html", "dist");

const needClean = !process.env.NODE_CLEAN;

const entries = [
  {
    name: "login",
    title: "Вход в систему",
    bodyClass: "login",
    filename: `${SRC_DIR}/login.js`,
  },
  {
    name: "home",
    title: "Hi-Tech Agro",
    bodyClass: "home",
    filename: `${SRC_DIR}/home.js`,
  },
];

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (SRC_DIR)
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

const defaultPlugins = [
  new webpack.LoaderOptionsPlugin({debug: false}),
  new MiniCssExtractPlugin({
    filename: DEV_MODE ? "css/[name].css" : "css/[name].[contenthash:8].css",
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(DEV_MODE),
    __APP_VERSION__: JSON.stringify(packageJson.version),

  }),
  new webpack.ProvidePlugin({
    React: "react",
    ReactDOM: "react-dom",
    PropTypes: "prop-types",
    moment: "moment",
  }),
  ...entries.map(({
    title,
    bodyClass,
    name,
  }) => new HtmlWebpackPlugin({
    title,
    bodyClass,
    favicon: `${SRC_DIR}/favicons/favicon.ico`,
    template: `${SRC_DIR}/template.html`,
    filename: `${name}.html`,
    chunks: ["runtime", "init", name],
    collapseWhitespace: false,
    inject: false,
  })),
  new DuplicatePackageCheckerPlugin(),
];

const plugins = needClean ? [
    new CleanWebpackPlugin(DIST, {
      root: path.resolve(__dirname, "../"),
      exclude: [],
    }),
  ...defaultPlugins,
  ] : defaultPlugins;

module.exports = {
  entry: {
    init: `${SRC_DIR}/init.js`,
    ...entries.reduce((acc, {name, filename}) => {
      acc[name] = filename;
      return acc;
    }, {}),
  },

  output: {
    path: DIST,
    publicPath: "/dist/",
    filename: DEV_MODE ? "js/[name].js" : "js/[name].[contenthash:8].js",
  },

  devServer: {
    port: 3000,
  },

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "node_modules")]
      .concat(SRC_DIR.split(path.delimiter).filter(Boolean)),
    alias: {
      // warning: path.resolve(__dirname, "node_modules/warning"),
      // isarray: path.resolve(__dirname, "node_modules/isarray"),
      // debug: path.resolve(__dirname, "node_modules/debug"),
      // "@babel/runtime": path.resolve(__dirname, "node_modules/@babel/runtime"),
      // "hoist-non-react-statics": path.resolve(__dirname, "node_modules/hoist-non-react-statics"),
      // "dom-helpers": path.resolve(__dirname, "node_modules/dom-helpers"),
      // "react-transition-group": path.resolve(__dirname, "node_modules/react-transition-group"),
      // "object-assign": path.resolve(__dirname, "node_modules/object-assign"),
    },
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: require.resolve("babel-loader"),
      options: {
        cacheDirectory: true,
      },
    },
    {
      test: /\.(bmp|gif|jpe?g|png|svg)$/,
      loader: require.resolve("file-loader"),
      options: {
        limit: 10000,
        name: DEV_MODE ? "images/[name].[ext]" : "images/[name].[contenthash:8].[ext]",
      },
    },
    {
      test: /\.(woff|woff2|otf|ttf|eot)$/,
      loader: require.resolve("file-loader"),
      options: {
        limit: 10000,
        name: DEV_MODE ? "fonts/[name].[ext]" : "fonts/[name].[contenthash:8].[ext]",
      },
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve("css-loader"),
          options: {importLoaders: 1},
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                flexBugsFix,
                autoprefixer({
                  overrideBrowserslist: [
                    ">0.2%",
                    "not dead",
                    "not ie < 11",
                    "not op_mini all",
                  ],
                  flexbox: "no-2009",
                }),
              ],
            },
          },
        },
      ],
    }],
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "async",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        commons: {
          test: /(node_modules).+(?<!css)$/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace("@", "")}`;
          },
          chunks: "all",
          priority: -10,
        },
        vendor: {
          test: /(node_modules).+(?<!css)$/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },

  devtool: "source-map",

  plugins: plugins,
};
