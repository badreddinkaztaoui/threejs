const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    root: path.resolve(__dirname, "../src/app.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
      return `${filepath}/[name].[hash][ext]`;
    },
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|ico|png|webp|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Transform objects with three js",
      filename: "index.html",
      template: path.resolve(__dirname, "../src/temp.html"),
      minify: true,
    }),
  ],
};
