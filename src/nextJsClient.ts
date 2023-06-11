import type { NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { identityMiddleware, nextJsMiddlewareWrapper } from './middleware'
import { PostHog } from 'posthog-node'
import { fetch } from './fetch'
import { CYCLONE_POSTHOG_ADDRESS } from './constants'

// Cyclone analytics client for Next.JS edge runtime
export default class Client {
  projectId: string
  posthogClient: PostHog
  machineId: string
  doNotTrack: boolean

  constructor (projectId: string, apiKey: string) {
    this.projectId = projectId
    this.posthogClient = new PostHog(apiKey, {
      host: CYCLONE_POSTHOG_ADDRESS,
      fetch,
      flushAt: 1,
      flushInterval: 1000
    })

    // Next.JS does not allow machine ID access from Edge Runtime
    // so we load it with best effort from env var
    // This env var is usually set by Cyclone node client
    this.machineId = process.env.NEXT_PUBLIC_CYCLONE_MACHINE_ID ?? 'unknown'

    this.doNotTrack = process.env.NEXT_PUBLIC_CYCLONE_DO_NOT_TRACK !== undefined
  }

  nextJsMiddleware (pathPrefixFilterList?: string[]): NextMiddleware {
    if (this.doNotTrack) {
      return identityMiddleware
    }

    return nextJsMiddlewareWrapper(identityMiddleware, this.posthogClient, this.projectId, this.machineId, pathPrefixFilterList)
  }

  wrapNextJsMiddleware (middleware: (req: NextRequest) => NextResponse | undefined, pathPrefixFilterList?: string[]): NextMiddleware {
    if (this.doNotTrack) {
      return middleware
    }

    return nextJsMiddlewareWrapper(middleware, this.posthogClient, this.projectId, this.machineId, pathPrefixFilterList)
  }

  async shutdownAsync (): Promise<void> {
    await this.posthogClient.shutdownAsync()
  }

  shutdown (): void {
    this.posthogClient.shutdown()
  }
}
