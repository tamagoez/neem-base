import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "./utils/supabaseAdmin";
import { validateAPIKey } from "./utils/db/validate";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

export async function middleware(request: NextRequest) {
  const res = await request.json();
  // Call our authentication function to check the request
  if (!(await validateAPIKey(res.apikey))) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
