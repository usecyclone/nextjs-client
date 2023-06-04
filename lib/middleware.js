"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityMiddleware = exports.nextJsMiddlewareWrapper = void 0;
const server_1 = require("next/server");
function nextJsMiddlewareWrapper(middleware) {
    return (req) => {
        const url = req.nextUrl;
        const { pathname } = url;
        const metadata = {
            pathname: pathname,
            status: undefined,
        };
        const response = middleware(req);
        if (response) {
            // @ts-ignore
            metadata["status"] = response.status;
        }
        // TODO: send to posthog
        return response;
    };
}
exports.nextJsMiddlewareWrapper = nextJsMiddlewareWrapper;
const identityMiddleware = (req) => {
    const url = req.nextUrl;
    return server_1.NextResponse.rewrite(url);
};
exports.identityMiddleware = identityMiddleware;
