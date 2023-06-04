import { PostHog } from 'posthog-node'
import { CYCLONE_POSTHOG_ADDRESS } from './constants'
import { machineIdSync } from 'node-machine-id';

export default class NodeClient {
    projectId: string
    posthogClient: PostHog
    machineId: string

    constructor(projectId: string, apiKey: string) {
        this.projectId = projectId
        this.posthogClient = new PostHog(apiKey, {
            host: CYCLONE_POSTHOG_ADDRESS
        })
        this.machineId = machineIdSync(true)

        // Use prepend listener because we want to run Cyclone signal handler before
        // another signal handler that explicitly calls process.exit()
        process.prependListener('SIGINT', this.getSignalHandler('SIGINT'))
        process.prependListener('SIGTERM', this.getSignalHandler('SIGTERM'))
    }


    getSignalHandler(signal: String) {
        return () => {
            // this.posthogClient.capture()
            this.shutdown()
        };
    }


    async shutdownAsync() {
        await this.posthogClient.shutdownAsync()
    }

    shutdown() {
        this.posthogClient.shutdown()
    }
}