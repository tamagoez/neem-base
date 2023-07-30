import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "./utils/supabaseAdmin";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

export async function middleware(req) {
  const basicAuth = req.headers.get("authorization");
  function tokenerror() {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: "token is unvalid" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [tokenid, serverid] = atob(authValue).split(":");

    const { data, error } = await supabaseAdmin
      .from("server_internal")
      .select("tokenid")
      .eq("serverid", serverid)
      .single();

    if (error || data.tokenid !== tokenid) tokenerror();
  } else {
    tokenerror();
  }
}
