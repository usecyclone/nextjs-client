import { type NextRequest, NextResponse, type NextMiddleware, type NextFetchEvent } from 'next/server'
import { type NextMiddlewareResult } from 'next/dist/server/web/types.js'
import { type PostHog } from 'posthog-node'

export function nextJsMiddlewareWrapper (
  middleware: NextMiddleware,
  posthog: PostHog,
  projectId: string,
  machineId: string,
  // pathPrefixFilterList is used to filter out requests by path name
  // requests that match the filter will not emit any metrics
  pathPrefixFilterList?: string[]
): (req: NextRequest, event: NextFetchEvent) => NextMiddlewareResult {
  return (req: NextRequest, event: NextFetchEvent) => {
    const url = req.nextUrl
    const { pathname } = url

    if (pathPrefixFilterList != null) {
      const shouldNotApplyMiddleware = pathPrefixFilterList.map(filter => pathname.startsWith(filter)).some(val => val)
      if (shouldNotApplyMiddleware) {
        return middleware(req, event)
      }
    }

    // if cyclone client side script is running in the browser, cyclone-browser-id will be set in the cookie
    const browserId = req.cookies.get('cyclone-browser-id')?.value ?? ''

    const metadata: {
      browserId: string
      pathname: string
      status: number
      projectId: string
      machineId: string
    } = {
      pathname,
      projectId,
      status: 0,
      browserId,
      machineId
    }

    const response = middleware(req, event)

    if (response) {
      metadata.status = response.status
    }

    posthog.capture({
      distinctId: 'abc',
      event: 'next_js_middleware_request',
      properties: metadata
    })

    return response
  }
}

export const identityMiddleware = (req: NextRequest, event: NextFetchEvent) => {
  return NextResponse.next()
}
