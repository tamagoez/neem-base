import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSupabaseAdmin } from "./utils/supabaseAdmin";
import { validateAPIKey } from "./utils/db/validate";

const noLoginEQ = ["/", "/auth", "/login", "/signup"];
// const noLoginSTARTSWITH = ["/connect/"];
const checkURLNoLogin = (url: string) => {
  return noLoginEQ.includes(url) || url.startsWith("/connect/");
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.pathname;
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();
  if (url.startsWith("/api/")) {
    const authorization = req.headers.get("authorization");
    const reqIP = req.ip;

    // Call our authentication function to check the request
    try {
      // return;
      const authValue = authorization.split(" ")[1];
      await validateAPIKey(authValue, reqIP);
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `authentication failed: ${error.message}`,
        }),
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

  if (!session && checkURLNoLogin(req.url)) {
    return NextResponse.redirect(
      new URL(`/auth?redirectTo=${req.url}`, req.url)
    );
  }
  return res;
}
