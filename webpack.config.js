const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // Injects CSS into the DOM
          "css-loader",   // Turns css into js
          "sass-loader",  // Compiles Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/bookit/", 
  },
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
    open: true,
  },
};
