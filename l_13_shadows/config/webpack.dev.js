const { merge } = require("webpack-merge");
const commomConfig = require("./webpack.common");
const path = require("path");

module.exports = merge(commomConfig, {
  mode: "development",
  // Devtool
  devtool: "inline-source-map",
  // Devserver
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3030,
    open: true,
    https: false,
    hot: true,
    devMiddleware: {
      stats: false,
    },
  },
});
