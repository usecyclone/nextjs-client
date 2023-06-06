import { NextRequest, NextResponse, NextMiddleware, NextFetchEvent } from 'next/server';
import { NextMiddlewareResult } from 'next/dist/server/web/types.js';
import { PostHog } from 'posthog-node';
export declare function nextJsMiddlewareWrapper(middleware: NextMiddleware, posthog: PostHog, projectId: string, pathPrefixFilterList?: string[]): (req: NextRequest, event: NextFetchEvent) => NextMiddlewareResult;
export declare const identityMiddleware: (req: NextRequest, event: NextFetchEvent) => NextResponse<unknown>;
