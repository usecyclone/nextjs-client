"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const posthog_node_1 = require("posthog-node");
const node_machine_id_1 = require("node-machine-id");
const CYCLONE_POSTHOG_ADDRESS = 'https://ph.usecyclone.dev';
// Cyclone analytics client
class Client {
    projectId;
    posthogClient;
    machineId;
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.posthogClient = new posthog_node_1.PostHog(apiKey, {
            host: CYCLONE_POSTHOG_ADDRESS
        });
        // TODO: consider hashing by project ID
        this.machineId = (0, node_machine_id_1.machineIdSync)(true);
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
