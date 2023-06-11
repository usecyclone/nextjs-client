import { type NextRequest, NextResponse, type NextMiddleware, type NextFetchEvent } from 'next/server';
import { type NextMiddlewareResult } from 'next/dist/server/web/types.js';
import { type PostHog } from 'posthog-node';
export declare function nextJsMiddlewareWrapper(middleware: NextMiddleware, posthog: PostHog, projectId: string, machineId: string, pathPrefixFilterList?: string[]): (req: NextRequest, event: NextFetchEvent) => NextMiddlewareResult;
export declare const identityMiddleware: (req: NextRequest, event: NextFetchEvent) => NextResponse<unknown>;
