/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/proxy/route";
exports.ids = ["app/api/proxy/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproxy%2Froute&page=%2Fapi%2Fproxy%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproxy%2Froute.ts&appDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproxy%2Froute&page=%2Fapi%2Fproxy%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproxy%2Froute.ts&appDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_milenaveleva_Git_polydashboard_src_app_api_proxy_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/proxy/route.ts */ \"(rsc)/./src/app/api/proxy/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/proxy/route\",\n        pathname: \"/api/proxy\",\n        filename: \"route\",\n        bundlePath: \"app/api/proxy/route\"\n    },\n    resolvedPagePath: \"/Users/milenaveleva/Git/polydashboard/src/app/api/proxy/route.ts\",\n    nextConfigOutput,\n    userland: _Users_milenaveleva_Git_polydashboard_src_app_api_proxy_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm94eSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJveHklMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm94eSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1pbGVuYXZlbGV2YSUyRkdpdCUyRnBvbHlkYXNoYm9hcmQlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbWlsZW5hdmVsZXZhJTJGR2l0JTJGcG9seWRhc2hib2FyZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9taWxlbmF2ZWxldmEvR2l0L3BvbHlkYXNoYm9hcmQvc3JjL2FwcC9hcGkvcHJveHkvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Byb3h5L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcHJveHlcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Byb3h5L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21pbGVuYXZlbGV2YS9HaXQvcG9seWRhc2hib2FyZC9zcmMvYXBwL2FwaS9wcm94eS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproxy%2Froute&page=%2Fapi%2Fproxy%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproxy%2Froute.ts&appDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/proxy/route.ts":
/*!************************************!*\
  !*** ./src/app/api/proxy/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_api_proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/api/proxy */ \"(rsc)/./src/lib/api/proxy.ts\");\n\n\nasync function GET(request) {\n    const urlParam = request.nextUrl.searchParams.get(\"url\");\n    if (!urlParam) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Missing url parameter\"\n        }, {\n            status: 400\n        });\n    }\n    let targetUrl;\n    try {\n        targetUrl = new URL(urlParam);\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Invalid url\"\n        }, {\n            status: 400\n        });\n    }\n    if (!(0,_lib_api_proxy__WEBPACK_IMPORTED_MODULE_1__.isAllowedProxyHost)(targetUrl.hostname)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Host not allowed\"\n        }, {\n            status: 403\n        });\n    }\n    try {\n        const res = await fetch(targetUrl.toString(), {\n            headers: {\n                Accept: \"application/json\",\n                \"User-Agent\": \"Polydashboard/1.0\"\n            },\n            next: {\n                revalidate: 0\n            }\n        });\n        const data = await res.json().catch(()=>({}));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n            status: res.status\n        });\n    } catch (err) {\n        console.error(\"Proxy fetch error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err instanceof Error ? err.message : \"Proxy request failed\"\n        }, {\n            status: 502\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9wcm94eS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFDSDtBQUU5QyxlQUFlRSxJQUFJQyxPQUFvQjtJQUM1QyxNQUFNQyxXQUFXRCxRQUFRRSxPQUFPLENBQUNDLFlBQVksQ0FBQ0MsR0FBRyxDQUFDO0lBQ2xELElBQUksQ0FBQ0gsVUFBVTtRQUNiLE9BQU9KLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtJQUVBLElBQUlDO0lBQ0osSUFBSTtRQUNGQSxZQUFZLElBQUlDLElBQUlSO0lBQ3RCLEVBQUUsT0FBTTtRQUNOLE9BQU9KLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFjLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25FO0lBRUEsSUFBSSxDQUFDVCxrRUFBa0JBLENBQUNVLFVBQVVFLFFBQVEsR0FBRztRQUMzQyxPQUFPYixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBbUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDeEU7SUFFQSxJQUFJO1FBQ0YsTUFBTUksTUFBTSxNQUFNQyxNQUFNSixVQUFVSyxRQUFRLElBQUk7WUFDNUNDLFNBQVM7Z0JBQ1BDLFFBQVE7Z0JBQ1IsY0FBYztZQUNoQjtZQUNBQyxNQUFNO2dCQUFFQyxZQUFZO1lBQUU7UUFDeEI7UUFFQSxNQUFNQyxPQUFPLE1BQU1QLElBQUlOLElBQUksR0FBR2MsS0FBSyxDQUFDLElBQU8sRUFBQztRQUM1QyxPQUFPdEIscURBQVlBLENBQUNRLElBQUksQ0FBQ2EsTUFBTTtZQUFFWCxRQUFRSSxJQUFJSixNQUFNO1FBQUM7SUFDdEQsRUFBRSxPQUFPYSxLQUFLO1FBQ1pDLFFBQVFmLEtBQUssQ0FBQyxzQkFBc0JjO1FBQ3BDLE9BQU92QixxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtZQUFFQyxPQUFPYyxlQUFlRSxRQUFRRixJQUFJRyxPQUFPLEdBQUc7UUFBdUIsR0FDckU7WUFBRWhCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvbWlsZW5hdmVsZXZhL0dpdC9wb2x5ZGFzaGJvYXJkL3NyYy9hcHAvYXBpL3Byb3h5L3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGlzQWxsb3dlZFByb3h5SG9zdCB9IGZyb20gXCJAL2xpYi9hcGkvcHJveHlcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCB1cmxQYXJhbSA9IHJlcXVlc3QubmV4dFVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidXJsXCIpO1xuICBpZiAoIXVybFBhcmFtKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyB1cmwgcGFyYW1ldGVyXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgfVxuXG4gIGxldCB0YXJnZXRVcmw6IFVSTDtcbiAgdHJ5IHtcbiAgICB0YXJnZXRVcmwgPSBuZXcgVVJMKHVybFBhcmFtKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCB1cmxcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgaWYgKCFpc0FsbG93ZWRQcm94eUhvc3QodGFyZ2V0VXJsLmhvc3RuYW1lKSkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkhvc3Qgbm90IGFsbG93ZWRcIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh0YXJnZXRVcmwudG9TdHJpbmcoKSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIlVzZXItQWdlbnRcIjogXCJQb2x5ZGFzaGJvYXJkLzEuMFwiLFxuICAgICAgfSxcbiAgICAgIG5leHQ6IHsgcmV2YWxpZGF0ZTogMCB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEsIHsgc3RhdHVzOiByZXMuc3RhdHVzIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiUHJveHkgZmV0Y2ggZXJyb3I6XCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IFwiUHJveHkgcmVxdWVzdCBmYWlsZWRcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMiB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImlzQWxsb3dlZFByb3h5SG9zdCIsIkdFVCIsInJlcXVlc3QiLCJ1cmxQYXJhbSIsIm5leHRVcmwiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ0YXJnZXRVcmwiLCJVUkwiLCJob3N0bmFtZSIsInJlcyIsImZldGNoIiwidG9TdHJpbmciLCJoZWFkZXJzIiwiQWNjZXB0IiwibmV4dCIsInJldmFsaWRhdGUiLCJkYXRhIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiRXJyb3IiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/proxy/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/api/proxy.ts":
/*!******************************!*\
  !*** ./src/lib/api/proxy.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PROXY_ALLOWED_HOSTS: () => (/* binding */ PROXY_ALLOWED_HOSTS),\n/* harmony export */   getFetchUrl: () => (/* binding */ getFetchUrl),\n/* harmony export */   getProxiedUrl: () => (/* binding */ getProxiedUrl),\n/* harmony export */   isAllowedProxyHost: () => (/* binding */ isAllowedProxyHost)\n/* harmony export */ });\n/**\n * Allowed hosts for the proxy (CORS workaround when calling from browser).\n */ const PROXY_ALLOWED_HOSTS = [\n    \"gamma-api.polymarket.com\",\n    \"clob.polymarket.com\",\n    \"data-api.polymarket.com\"\n];\nfunction isAllowedProxyHost(host) {\n    return PROXY_ALLOWED_HOSTS.includes(host);\n}\n/**\n * When running in the browser, requests to Polymarket APIs are blocked by CORS.\n * Use the Next.js API proxy so the request is made from the server.\n */ function getProxiedUrl(absoluteUrl) {\n    return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;\n}\n/**\n * Use this for fetch in API clients: uses proxy in browser, direct URL on server.\n */ function getFetchUrl(absoluteUrl) {\n    if (true) return absoluteUrl;\n    return getProxiedUrl(absoluteUrl);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2FwaS9wcm94eS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0NBRUMsR0FDTSxNQUFNQSxzQkFBc0I7SUFDakM7SUFDQTtJQUNBO0NBQ0QsQ0FBVTtBQUVKLFNBQVNDLG1CQUFtQkMsSUFBWTtJQUM3QyxPQUFPRixvQkFBb0JHLFFBQVEsQ0FBQ0Q7QUFDdEM7QUFFQTs7O0NBR0MsR0FDTSxTQUFTRSxjQUFjQyxXQUFtQjtJQUMvQyxPQUFPLENBQUMsZUFBZSxFQUFFQyxtQkFBbUJELGNBQWM7QUFDNUQ7QUFFQTs7Q0FFQyxHQUNNLFNBQVNFLFlBQVlGLFdBQW1CO0lBQzdDLElBQUksSUFBNkIsRUFBRSxPQUFPQTtJQUMxQyxPQUFPRCxjQUFjQztBQUN2QiIsInNvdXJjZXMiOlsiL1VzZXJzL21pbGVuYXZlbGV2YS9HaXQvcG9seWRhc2hib2FyZC9zcmMvbGliL2FwaS9wcm94eS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFsbG93ZWQgaG9zdHMgZm9yIHRoZSBwcm94eSAoQ09SUyB3b3JrYXJvdW5kIHdoZW4gY2FsbGluZyBmcm9tIGJyb3dzZXIpLlxuICovXG5leHBvcnQgY29uc3QgUFJPWFlfQUxMT1dFRF9IT1NUUyA9IFtcbiAgXCJnYW1tYS1hcGkucG9seW1hcmtldC5jb21cIixcbiAgXCJjbG9iLnBvbHltYXJrZXQuY29tXCIsXG4gIFwiZGF0YS1hcGkucG9seW1hcmtldC5jb21cIixcbl0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FsbG93ZWRQcm94eUhvc3QoaG9zdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBQUk9YWV9BTExPV0VEX0hPU1RTLmluY2x1ZGVzKGhvc3QgYXMgKHR5cGVvZiBQUk9YWV9BTExPV0VEX0hPU1RTKVtudW1iZXJdKTtcbn1cblxuLyoqXG4gKiBXaGVuIHJ1bm5pbmcgaW4gdGhlIGJyb3dzZXIsIHJlcXVlc3RzIHRvIFBvbHltYXJrZXQgQVBJcyBhcmUgYmxvY2tlZCBieSBDT1JTLlxuICogVXNlIHRoZSBOZXh0LmpzIEFQSSBwcm94eSBzbyB0aGUgcmVxdWVzdCBpcyBtYWRlIGZyb20gdGhlIHNlcnZlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3hpZWRVcmwoYWJzb2x1dGVVcmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgL2FwaS9wcm94eT91cmw9JHtlbmNvZGVVUklDb21wb25lbnQoYWJzb2x1dGVVcmwpfWA7XG59XG5cbi8qKlxuICogVXNlIHRoaXMgZm9yIGZldGNoIGluIEFQSSBjbGllbnRzOiB1c2VzIHByb3h5IGluIGJyb3dzZXIsIGRpcmVjdCBVUkwgb24gc2VydmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmV0Y2hVcmwoYWJzb2x1dGVVcmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gYWJzb2x1dGVVcmw7XG4gIHJldHVybiBnZXRQcm94aWVkVXJsKGFic29sdXRlVXJsKTtcbn1cbiJdLCJuYW1lcyI6WyJQUk9YWV9BTExPV0VEX0hPU1RTIiwiaXNBbGxvd2VkUHJveHlIb3N0IiwiaG9zdCIsImluY2x1ZGVzIiwiZ2V0UHJveGllZFVybCIsImFic29sdXRlVXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZ2V0RmV0Y2hVcmwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/api/proxy.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproxy%2Froute&page=%2Fapi%2Fproxy%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproxy%2Froute.ts&appDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmilenaveleva%2FGit%2Fpolydashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();