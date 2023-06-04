import { identityMiddleware, nextJsMiddlewareWrapper } from "./middleware";
import { PostHog } from 'posthog-node';
import { fetch } from "./fetch";
import { CYCLONE_POSTHOG_ADDRESS } from "./constants";
// Cyclone analytics client for Next.JS edge runtime
export default class Client {
    projectId;
    posthogClient;
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.posthogClient = new PostHog(apiKey, {
            host: CYCLONE_POSTHOG_ADDRESS,
            fetch: fetch,
        });
    }
    nextJsMiddleware(pathPrefixFilterList) {
        return nextJsMiddlewareWrapper(identityMiddleware, this.posthogClient, this.projectId, pathPrefixFilterList);
    }
    wrapNextJsMiddleware(middleware, pathPrefixFilterList) {
        return nextJsMiddlewareWrapper(middleware, this.posthogClient, this.projectId, pathPrefixFilterList);
    }
    async shutdownAsync() {
        await this.posthogClient.shutdownAsync();
    }
    shutdown() {
        this.posthogClient.shutdown();
    }
}
