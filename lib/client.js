"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
// Cyclone analytics client
class Client {
    projectId;
    apiKey;
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.apiKey = apiKey;
    }
    nextJsMiddleware(req) {
        return (0, middleware_1.nextJsMiddlewareWrapper)(middleware_1.identityMiddleware)(req);
    }
    wrapNextJsMiddleware(middleware) {
        return (0, middleware_1.nextJsMiddlewareWrapper)(middleware);
    }
}
exports.default = Client;
