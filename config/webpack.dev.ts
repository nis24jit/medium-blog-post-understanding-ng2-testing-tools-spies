let webpack = require("webpack");
let webpackMerge = require("webpack-merge");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let commonConfig = require("./webpack.common.js");
import { rootPathTo } from "./helpers";
let webpackValidator = require("webpack-validator");
let StyleLintPlugin = require("stylelint-webpack-plugin");

// Add non-default webpack-validator property to validate against
const Joi = require("webpack-validator").Joi;
const yourSchemaExtension = Joi.object({
  htmlhint: Joi.any(),
});

let ENV = process.env.NODE_ENV = process.env.ENV = "development";

let webpackConfigs = webpackMerge(commonConfig, {
  devtool: "eval-source-map",

  module: {
    preLoaders: [
      {
        test: /\.html$/,
        include: rootPathTo(["src"]),
        loader: "htmlhint-loader",
      },
    ],
  },

  output: {
    path: rootPathTo(["dist"]),
    publicPath: "http://localhost:8080/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
    // Utilizing (webpack.DefinePlugin + Uglifly minification algorithm) to inclusion
    // toggle of code based on environment variables defined below, this helps hide
    // code based on the environment variable and reduce the size of the end result
    // bundle (Primarly used by production when Uglifying)
    new webpack.DefinePlugin({
      "process.env": {
        "ENV": JSON.stringify(ENV),
      },
    }),
    new StyleLintPlugin({
      configFile: ".stylelintrc.json",
      syntax: "scss",
      failOnError: false,
    }),
  ],

  devServer: {
    historyApiFallback: true,
    stats: "minimal",
  },

  htmlhint: {
    configFile: ".htmlhintrc.json",
    emitAs: "error",
    failOnError: "false",
  },
});

module.exports = webpackValidator(webpackConfigs, { schemaExtension: yourSchemaExtension });
