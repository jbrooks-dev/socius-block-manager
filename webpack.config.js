const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@wordpress/babel-preset-default"],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new DependencyExtractionWebpackPlugin({
        injectPolyfill: true,
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    devtool: isProduction ? false : "source-map",
  };
};
