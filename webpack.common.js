const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: {
      import: "./src/js/index.js",
      dependOn: "shared",
    },
    hours: {
      import: "./src/js/hours.js",
      dependOn: "shared",
    },
    weeks: {
      import: "./src/js/weeks.js",
      dependOn: "shared",
    },
    shared: "./src/js/data.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/pages/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "hours.html",
      template: "./src/pages/hours.html",
    }),
    new HtmlWebpackPlugin({
      filename: "weeks.html",
      template: "./src/pages/weeks.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};