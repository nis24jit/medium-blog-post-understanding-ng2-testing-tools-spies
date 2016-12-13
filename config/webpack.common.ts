let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
import { rootPathTo } from "./helpers";
let autoprefixer = require("autoprefixer");

let webPackConfigs = {
  entry: {
    "polyfills": rootPathTo(["src", "polyfills.ts"]),
    "vendor": rootPathTo(["src", "vendor.ts"]),
    "app": rootPathTo(["src", "main.ts"]),
    "style": [
      // rootPathTo(["node_modules", "foundation", "scss", "foundation.scss"]),
      rootPathTo(["public", "css", "common.scss"]),
    ],
  },

  resolve: {
    extensions: ["", ".ts", ".js"],
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        include: rootPathTo(["src"]),
        loader: "tslint",
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
        // "-minimize" fixed the image issue in the app.component.html
        // when production building the code with "webpack --config webpack.prod.js".
        // I though the issue was coming from ugilifyPlugin but it was actually coming from
        // the html loader (https://goo.gl/Cdt5II) => (https://goo.gl/sxvXjR)
        loader: "html-loader?-minimize",
      },
      {
        test: /\.(jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: [rootPathTo(["src"]), rootPathTo(["public"])],
        loader: "file-loader?name=assets/[name].[hash].[ext]",
      },
      {
        test: /\.png$/,
        include: [rootPathTo(["src"]), rootPathTo(["public"])],
        loader: "url-loader?limit=10000",
      },
      {
        // Thirdparty + Custom css bundling
        // Extract CSS during build
        test: /\.scss$/,
        include: [rootPathTo(["public", "css"]), rootPathTo(["node_modules", "foundation", "scss"])],
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!postcss-loader!sass-loader?outputStyle=expanded"
        ),
      },
      {
        // Ng2 component css bundling
        test: /\.scss$/,
        include: rootPathTo(["src", "app"]),
        loader: "css-to-string-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded",
      },
      // TODO: 1 i just learned and added css-to-string and also
      // leaning/understanding angular2-template-loader, I feel like
      // im starting to really understand loaders and how they work
      // but just found a good book on webpack and going though it
      // right now and applying what i learn to here incrementally
      // as i am reading it.
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // Extract bundle and manifest files. Manifest is  needed for reliable caching.
      // TODO: Fix - having issues right now with manifest so commenting it out, but will need to cache correctly
      names: ["app", "vendor", "polyfills"/*, "manifest"*/],
    }),
    new HtmlWebpackPlugin({
      template: rootPathTo(["src", "index.html"]),
    }),
  ],

  postcss: [
    autoprefixer({ browsers: ["last 2 versions", "> 5%"] }),
  ],

  tslint: {
    // tslint errors are displayed by default as warnings
    // set emitErrors to true to display them as errors
    emitErrors: true,

    // tslint does not interrupt the compilation by default
    // if you want any file with tslint errors to fail
    // set failOnHint to true
    failOnHint: true,
  },
};

module.exports = webPackConfigs;
