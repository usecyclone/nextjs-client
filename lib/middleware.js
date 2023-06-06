"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityMiddleware = exports.nextJsMiddlewareWrapper = void 0;
const server_1 = require("next/server");
function nextJsMiddlewareWrapper(middleware, posthog, projectId, 
// pathPrefixFilterList is used to filter out requests by path name
// requests that match the filter will not emit any metrics
pathPrefixFilterList) {
    return (req, event) => {
        const url = req.nextUrl;
        const { pathname } = url;
        if (pathPrefixFilterList) {
            const shouldNotApplyMiddleware = pathPrefixFilterList.map(filter => pathname.startsWith(filter)).some(val => val);
            if (shouldNotApplyMiddleware) {
                return middleware(req, event);
            }
        }
        // if cyclone client side script is running in the browser, cyclone-browser-id will be set in the cookie
        const browserId = req.cookies.get('cyclone-browser-id')?.value ?? "";
        const metadata = {
            pathname: pathname,
            projectId: projectId,
            status: 0,
            browserId: browserId,
        };
        const response = middleware(req, event);
        if (response) {
            // @ts-ignore
            metadata["status"] = response.status;
        }
        posthog.capture({
            distinctId: "abc",
            event: "next_js_middleware_request",
            properties: metadata,
        });
        return response;
    };
}
exports.nextJsMiddlewareWrapper = nextJsMiddlewareWrapper;
const identityMiddleware = (req, event) => {
    return server_1.NextResponse.next();
};
exports.identityMiddleware = identityMiddleware;
