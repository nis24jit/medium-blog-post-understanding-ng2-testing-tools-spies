Error.stackTraceLimit = Infinity;

import "core-js/es6";
import "reflect-metadata";

import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/proxy";
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch";
import "zone.js/dist/async-test";
import "zone.js/dist/fake-async-test";

/**
 * This shim prepares karma specifically for the Angular test environment
 * and launches karma itself. It loads the systemjs.config.js file as part
 * of that process.
 */
let appContext = require.context("../src/app/dojo", true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

import * as testing from "@angular/core/testing";
import * as browser from "@angular/platform-browser-dynamic/testing";

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
