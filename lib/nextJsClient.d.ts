import { NextRequest, NextResponse } from "next/server";
import { PostHog } from 'posthog-node';
export default class Client {
    projectId: string;
    posthogClient: PostHog;
    constructor(projectId: string, apiKey: string);
    nextJsMiddleware(pathPrefixFilterList?: string[]): (req: NextRequest) => NextResponse<unknown> | undefined;
    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined, pathPrefixFilterList?: string[]): (req: NextRequest) => NextResponse<unknown> | undefined;
    shutdownAsync(): Promise<void>;
    shutdown(): void;
}
