import { NextRequest, NextResponse } from "next/server";
export default class Client {
    projectId: string;
    apiKey: string;
    constructor(projectId: string, apiKey: string);
    nextJsMiddleware(req: NextRequest): NextResponse | undefined;
    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined): (req: NextRequest) => NextResponse | undefined;
}
