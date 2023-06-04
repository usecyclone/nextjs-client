import { NextRequest, NextResponse } from 'next/server';
import { PostHog } from 'posthog-node'

export function nextJsMiddlewareWrapper(
    middleware: (req: NextRequest) => NextResponse | undefined,
    posthog: PostHog,
    machineId: string
): (req: NextRequest) => NextResponse | undefined {
    return (req: NextRequest) => {

        const url = req.nextUrl;
        const { pathname } = url;

        const metadata: {
            pathname: string,
            status: number,
        } = {
            pathname: pathname,
            status: 0,
        }

        const response = middleware(req)

        if (response) {
            // @ts-ignore
            metadata["status"] = response.status
        }

        posthog.capture({
            distinctId: "abc",
            event: "next_js_middleware_request",
            properties: metadata,
        })

        console.log(metadata)

        return response
    }
}

export const identityMiddleware = (req: NextRequest) => {
    const url = req.nextUrl;
    return NextResponse.rewrite(url);
}