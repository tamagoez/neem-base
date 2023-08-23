import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "./utils/supabaseAdmin";
import { validateAPIKey } from "./utils/db/validate";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  if (url.startsWith("/api/")) {
    const authorization = request.headers.get("authorization");

    // Call our authentication function to check the request
    try {
      // return;
      const authValue = authorization.split(" ")[1];
      await validateAPIKey(authValue);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "authentication failed" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
  }
  if (url.startsWith("/admin") && url !== "/admin") {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
