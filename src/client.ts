import { NextRequest, NextResponse } from "next/server";
import { identityMiddleware, nextJsMiddlewareWrapper } from "./middleware";

// Cyclone analytics client
export default class Client {
    projectId: string
    apiKey: string

    constructor(projectId: string, apiKey: string) {
        this.projectId = projectId
        this.apiKey = apiKey
    }

    nextJsMiddleware(req: NextRequest) {
        return nextJsMiddlewareWrapper(identityMiddleware)(req)
    }

    wrapNextJsMiddleware(middleware: (req: NextRequest) => NextResponse | undefined) {
        return nextJsMiddlewareWrapper(middleware)
    }
}