import { NextRequest, NextResponse } from 'next/server';
import { PostHog } from 'posthog-node';
export declare function nextJsMiddlewareWrapper(middleware: (req: NextRequest) => NextResponse | undefined, posthog: PostHog, projectId: string, pathPrefixFilterList?: string[]): (req: NextRequest) => NextResponse | undefined;
export declare const identityMiddleware: (req: NextRequest) => NextResponse;
