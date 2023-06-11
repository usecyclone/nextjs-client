import type { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { PostHog } from 'posthog-node';
export default class Client {
    projectId: string;
    posthogClient: PostHog;
    machineId: string;
    doNotTrack: boolean;
    constructor(projectId: string, apiKey: string);
    nextJsMiddleware(pathPrefixFilterList?: string[]): NextMiddleware;
    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined, pathPrefixFilterList?: string[]): NextMiddleware;
    shutdownAsync(): Promise<void>;
    shutdown(): void;
}
