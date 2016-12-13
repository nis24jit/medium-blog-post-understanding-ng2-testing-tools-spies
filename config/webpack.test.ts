import { rootPathTo } from "./helpers";
let webpackValidator = require("webpack-validator");

// Add non-default webpack-validator property to validate against
const Joi = require("webpack-validator").Joi;
const yourSchemaExtension = Joi.object({
  htmlhint: Joi.any(),
});

let webpackConfigs = {
  devtool: "inline-source-map",

  resolve: {
    extensions: ["", ".ts", ".js"],
  },

  module: {
    preLoaders: [
      {
        test: /\.html$/,
        include: rootPathTo(["src"]),
        loader: "htmlhint-loader",
      },
    ],
    loaders: [
      {
        test: /\.ts$/,
        include: rootPathTo(["src"]),
        loaders: ["awesome-typescript-loader", "angular2-template-loader"],
      },
      {
        test: /\.html$/,
        include: rootPathTo(["src"]),
        loader: "html",
      },
      {
        test: /\.(jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: [rootPathTo(["src"]), rootPathTo(["public"])],
        loader: "null",
      },
      {
        test: /\.png$/,
        include: [rootPathTo(["src"]), rootPathTo(["public"])],
        loader: "null",
      },
      {
        test: /\.scss$/,
        include: rootPathTo(["public/css"]),
        loader: "null",
      },
      {
        test: /\.scss$/,
        include: rootPathTo(["src", "app"]),
        loader: "raw",
      },
    ],
  },
  htmlhint: {
    configFile: ".htmlhintrc.json",
    emitAs: "error",
    failOnError: "true",
  },
};

module.exports = webpackValidator(webpackConfigs, { quiet: true, schemaExtension: yourSchemaExtension });
