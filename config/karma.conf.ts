import * as webpackConfig from "./webpack.test";

/**
 * The karma configuration file that specifies which plug-ins to use,
 * which application and test files to load, which browser(s) to use,
 * and how to report test results.
 *
 * It loads three other setup files:
 * - systemjs.config.js
 * - systemjs.config.extras.js
 * - karma-test-shim.js
 */

module.exports = function (config) {
  let configInfo = {
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      {
        pattern: "./config/karma-test-shim.js",
        watched: false
      },
    ],
    preprocessors: {
      "./config/karma-test-shim.js": ["webpack", "sourcemap"],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: "errors-only",
    },

    webpackServer: {
      noInfo: true,
    },

    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    singleRun: false,
  };

  config.set(configInfo);
};
