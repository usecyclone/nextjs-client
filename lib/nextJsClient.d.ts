import { NextRequest, NextResponse } from "next/server";
import { PostHog } from 'posthog-node';
export default class Client {
    projectId: string;
    posthogClient: PostHog;
    machineId: string;
    doNotTrack: boolean;
    constructor(projectId: string, apiKey: string);
    nextJsMiddleware(pathPrefixFilterList?: string[]): (req: NextRequest, event: import("next/server").NextFetchEvent) => any;
    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined, pathPrefixFilterList?: string[]): (req: NextRequest, event: import("next/server").NextFetchEvent) => any;
    shutdownAsync(): Promise<void>;
    shutdown(): void;
}
