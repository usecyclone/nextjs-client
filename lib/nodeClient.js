"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posthog_node_1 = require("posthog-node");
const constants_1 = require("./constants");
const node_machine_id_1 = require("node-machine-id");
class NodeClient {
    projectId;
    posthogClient;
    machineId;
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.posthogClient = new posthog_node_1.PostHog(apiKey, {
            host: constants_1.CYCLONE_POSTHOG_ADDRESS
        });
        this.machineId = (0, node_machine_id_1.machineIdSync)(true);
        // Use prepend listener because we want to run Cyclone signal handler before
        // another signal handler that explicitly calls process.exit()
        process.prependListener('SIGINT', this.getSignalHandler('SIGINT'));
        process.prependListener('SIGTERM', this.getSignalHandler('SIGTERM'));
    }
    getSignalHandler(signal) {
        return () => {
            // this.posthogClient.capture()
            this.shutdown();
        };
    }
    async shutdownAsync() {
        await this.posthogClient.shutdownAsync();
    }
    shutdown() {
        this.posthogClient.shutdown();
    }
}
exports.default = NodeClient;
