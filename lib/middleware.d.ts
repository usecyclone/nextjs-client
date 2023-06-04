import { NextRequest, NextResponse } from 'next/server';
export declare function nextJsMiddlewareWrapper(middleware: (req: NextRequest) => NextResponse | undefined): (req: NextRequest) => NextResponse | undefined;
export declare const identityMiddleware: (req: NextRequest) => NextResponse;
