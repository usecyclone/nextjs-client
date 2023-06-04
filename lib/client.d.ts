import { NextRequest, NextResponse } from "next/server";
import { PostHog } from 'posthog-node';
export default class Client {
    projectId: string;
    posthogClient: PostHog;
    machineId: string;
    constructor(projectId: string, apiKey: string);
    nextJsMiddleware(req: NextRequest): NextResponse | undefined;
    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined): (req: NextRequest) => NextResponse | undefined;
    shutdownAsync(): Promise<void>;
    shutdown(): void;
}
