import { NextResponse } from 'next/server';
export function nextJsMiddlewareWrapper(middleware, posthog, projectId, 
// pathPrefixFilterList is used to filter out requests by path name
// requests that match the filter will not emit any metrics
pathPrefixFilterList) {
    return (req) => {
        const url = req.nextUrl;
        const { pathname } = url;
        if (pathPrefixFilterList) {
            const shouldNotApplyMiddleware = pathPrefixFilterList.map(filter => pathname.startsWith(filter)).some(val => val);
            if (shouldNotApplyMiddleware) {
                return middleware(req);
            }
        }
        const metadata = {
            pathname: pathname,
            projectId: projectId,
            status: 0,
        };
        const response = middleware(req);
        if (response) {
            // @ts-ignore
            metadata["status"] = response.status;
        }
        posthog.capture({
            distinctId: "abc",
            event: "next_js_middleware_request",
            properties: metadata,
        });
        return response;
    };
}
export const identityMiddleware = (req) => {
    const url = req.nextUrl;
    return NextResponse.rewrite(url);
};
