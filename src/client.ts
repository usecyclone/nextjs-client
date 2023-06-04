import { NextRequest, NextResponse } from "next/server"
import { identityMiddleware, nextJsMiddlewareWrapper } from "./middleware"
import { PostHog } from 'posthog-node'
import { machineIdSync } from 'node-machine-id';

const CYCLONE_POSTHOG_ADDRESS = 'https://ph.usecyclone.dev'

// Cyclone analytics client
export default class Client {
    projectId: string
    posthogClient: PostHog
    machineId: string

    constructor(projectId: string, apiKey: string) {
        this.projectId = projectId
        this.posthogClient = new PostHog(apiKey, {
            host: CYCLONE_POSTHOG_ADDRESS
        })
        // TODO: consider hashing by project ID
        this.machineId = machineIdSync(true)
    }

    nextJsMiddleware(req: NextRequest) {
        return nextJsMiddlewareWrapper(identityMiddleware, this.posthogClient, this.machineId)(req)
    }

    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined) {
        return nextJsMiddlewareWrapper(middleware, this.posthogClient, this.machineId)
    }

    async shutdownAsync() {
        await this.posthogClient.shutdownAsync()
    }

    shutdown() {
        this.posthogClient.shutdown()
    }
}