const { merge } = require("webpack-merge");
const commomConfig = require("./webpack.common");

module.exports = merge(commomConfig, {
  mode: "production",
  output: {
    clean: true,
  },
});
