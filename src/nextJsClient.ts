import { NextRequest, NextResponse } from "next/server"
import { identityMiddleware, nextJsMiddlewareWrapper } from "./middleware"
import { PostHog } from 'posthog-node'
import { fetch } from "./fetch"

const CYCLONE_POSTHOG_ADDRESS = 'http://ph.usecyclone.dev'

// Cyclone analytics client for Next.JS edge runtime
export default class Client {
    projectId: string
    posthogClient: PostHog

    constructor(projectId: string, apiKey: string) {
        this.projectId = projectId
        this.posthogClient = new PostHog(apiKey, {
            host: CYCLONE_POSTHOG_ADDRESS,
            fetch: fetch,
        })
    }

    nextJsMiddleware(pathPrefixFilterList?: string[]) {
        return nextJsMiddlewareWrapper(identityMiddleware, this.posthogClient, this.projectId, pathPrefixFilterList)
    }

    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined, pathPrefixFilterList?: string[]) {
        return nextJsMiddlewareWrapper(middleware, this.posthogClient, this.projectId, pathPrefixFilterList)
    }

    async shutdownAsync() {
        await this.posthogClient.shutdownAsync()
    }

    shutdown() {
        this.posthogClient.shutdown()
    }
}