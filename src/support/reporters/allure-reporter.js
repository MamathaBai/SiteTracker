"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allure_cucumberjs_1 = require("allure-cucumberjs");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Reporter(options) {
    return new allure_cucumberjs_1.CucumberJSAllureFormatter(options, new allure_cucumberjs_1.AllureRuntime({ resultsDir: './reports/allure-results' }), {
        labels: [
            {
                name: 'epic',
                pattern: [/@feature:(.*)/],
            },
            {
                name: 'severity',
                pattern: [/@severity:(.*)/],
            },
        ],
        links: [
            {
                type: 'issue',
                pattern: [/@issue=(.*)/],
                urlTemplate: 'http://localhost:8080/issue/%s',
            },
            {
                type: 'tms',
                pattern: [/@tms=(.*)/],
                urlTemplate: 'http://localhost:8080/tms/%s',
            },
        ],
    });
}
Reporter.prototype = Object.create(allure_cucumberjs_1.CucumberJSAllureFormatter.prototype);
Reporter.prototype.constructor = Reporter;
exports.default = Reporter;
