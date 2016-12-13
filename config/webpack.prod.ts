let webpack = require("webpack");
let webpackMerge = require("webpack-merge");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let commonConfig = require("./webpack.common.js");
import { rootPathTo } from "./helpers";
let webpackValidator = require("webpack-validator");
let PurifyCSSPlugin = require("purifycss-webpack-plugin");
let StyleLintPlugin = require("stylelint-webpack-plugin");

// Add non-default webpack-validator property to validate against
const Joi = require("webpack-validator").Joi;
const yourSchemaExtension = Joi.object({
  htmlhint: Joi.any(),
  htmlLoader: Joi.any(),
});

let ENV = process.env.NODE_ENV = process.env.ENV = "production";

let webpackConfigs = webpackMerge(commonConfig, {
  devtool: "source-map",

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
    publicPath: "file:///home/tron/Dropbox/workspace/projects/bitbucket/hero_katzuki/ng2-seed-auth/dist/",
    filename: "[name].[chunkhash].js",
    // This is used for require.ensure. The setup will work without but this is useful to set.
    chunkFilename: "[id].[chunkhash].chunk.js",
  },
  htmlLoader: {
    minimize: false // workaround for ng2
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        except: ["webpackJsonp"],
        keep_fnames: true,
      },
      compress: {
        warnings: false,
      },
    }),
    /* Utilizing (webpack.DefinePlugin + Uglifly minification algorithm) to inclusion
    toggle of code based on environment variables defined below, this helps hide code
    based on the environment variable and reduce the size of the end result bundle
    (Primarly used by production when Uglifying) */
    new webpack.DefinePlugin({
      "process.env": {
        "ENV": JSON.stringify(ENV),
      },
    }),
    new PurifyCSSPlugin({
      purifyOptions: {
        info: true,
        minify: true,
      },
      basePath: process.cwd(),
    }),
    // Output extracted CSS to a file
    new ExtractTextPlugin("[name].[chunkhash].css"),
    new StyleLintPlugin({
      configFile: ".stylelintrc.json",
      syntax: "scss",
      failOnError: true,
    }),
  ],

  tslint: {
    // These options are useful if you want to save output to files
    // for your continuous integration server
    fileOutput: {
      // The directory where each file's report is saved
      dir: "./dist/tslint_error_logs/",
      // The extension to use for each report's filename. Defaults to "txt"
      ext: "txt",
      // If true, all files are removed from the report directory at the beginning of run
      clean: true,
      header: "tslint errors list\n",
    },
  },

  htmlhint: {
    configFile: ".htmlhintrc.json",
    emitAs: "error",
    failOnError: "false",
  },
});

module.exports = webpackValidator(webpackConfigs, { schemaExtension: yourSchemaExtension });
