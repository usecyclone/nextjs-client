"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const posthog_node_1 = require("posthog-node");
const fetch_1 = require("./fetch");
const constants_1 = require("./constants");
// Cyclone analytics client for Next.JS edge runtime
class Client {
    projectId;
    posthogClient;
    machineId;
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.posthogClient = new posthog_node_1.PostHog(apiKey, {
            host: constants_1.CYCLONE_POSTHOG_ADDRESS,
            fetch: fetch_1.fetch,
            flushAt: 1,
            flushInterval: 1000,
        });
        // Next.JS does not allow machine ID access from Edge Runtime
        // so we load it with best effort from env var
        // This env var is usually set by Cyclone node client
        this.machineId = process.env.NEXT_PUBLIC_CYCLONE_MACHINE_ID ?? "unknown";
    }
    nextJsMiddleware(pathPrefixFilterList) {
        return (0, middleware_1.nextJsMiddlewareWrapper)(middleware_1.identityMiddleware, this.posthogClient, this.projectId, this.machineId, pathPrefixFilterList);
    }
    wrapNextJsMiddleware(middleware, pathPrefixFilterList) {
        return (0, middleware_1.nextJsMiddlewareWrapper)(middleware, this.posthogClient, this.projectId, this.machineId, pathPrefixFilterList);
    }
    async shutdownAsync() {
        await this.posthogClient.shutdownAsync();
    }
    shutdown() {
        this.posthogClient.shutdown();
    }
}
exports.default = Client;
