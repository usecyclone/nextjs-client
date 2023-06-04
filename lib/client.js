"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const posthog_node_1 = require("posthog-node");
const fetch_1 = require("./fetch");
// import { machineIdSync } from 'node-machine-id';
const CYCLONE_POSTHOG_ADDRESS = 'http://ph.usecyclone.dev';
// Cyclone analytics client
class Client {
    projectId;
    posthogClient;
    machineId;
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.posthogClient = new posthog_node_1.PostHog(apiKey, {
            host: CYCLONE_POSTHOG_ADDRESS,
            fetch: fetch_1.fetch,
            flushInterval: 1000,
        });
        // TODO: consider hashing by project ID
        this.machineId = "abc"; // TODO
    }
    nextJsMiddleware(req) {
        return (0, middleware_1.nextJsMiddlewareWrapper)(middleware_1.identityMiddleware, this.posthogClient, this.machineId)(req);
    }
    wrapNextJsMiddleware(middleware) {
        return (0, middleware_1.nextJsMiddlewareWrapper)(middleware, this.posthogClient, this.machineId);
    }
    async shutdownAsync() {
        await this.posthogClient.shutdownAsync();
    }
    shutdown() {
        this.posthogClient.shutdown();
    }
}
exports.default = Client;
