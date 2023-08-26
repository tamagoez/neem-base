"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { useSupabaseAdmin } from "../../../utils/supabaseAdmin";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // redirectIdクエリについて確認する
  const supabaseAdmin = useSupabaseAdmin;
  const redirectId = searchParams.get("redirectTo") ?? undefined;
  if (redirectId) {
    try {
      const { data, error } = await supabaseAdmin
        .from("signup_issue")
        .select("ip, serverid")
        .eq("id", redirectId)
        .single();
      if (error) throw error;
      
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }

  return NextResponse.redirect(new URL("/account", req.url));
}
