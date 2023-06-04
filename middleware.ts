import { NextRequest, NextResponse } from 'next/server';

export function nextJsMiddlewareWrapper(middleware: (req: NextRequest) => NextResponse | undefined): (req: NextRequest) => NextResponse | undefined {
    return (req: NextRequest) => {

        const url = req.nextUrl;
        const { pathname } = url;

        const metadata = {
            pathname: pathname,
        }

        const response = middleware(req)

        if (response) {
            metadata["status"] = response.status
        }

        // TODO: send to posthog

        return response
    }
}

export const identityMiddleware = (req: NextRequest) => {
    const url = req.nextUrl;
    return NextResponse.rewrite(url);
}