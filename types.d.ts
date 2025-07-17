// Custom type declarations for Next.js App Router
import { NextRequest } from 'next/server';

declare module 'next/server' {
  // Define the context parameter format for dynamic API routes
  interface RouteHandlerContext {
    params: Record<string, string | string[]>;
  }

  // Extend the function signature for route handlers
  interface RouteHandlerFn {
    (req: NextRequest, ctx: RouteHandlerContext): Promise<Response>;
  }
} 