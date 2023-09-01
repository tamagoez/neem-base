"use server";

// Request Method
//
// apikey -> middleware.tsで捌く
// serverId -> サーバーを一応仕分ける

import { NextResponse } from "next/server";
import { useSupabaseAdmin } from "../../../../utils/supabaseAdmin";
import { generateToken68 } from "../../../common/token68";

export async function POST(request: Request) {
  const { serverId } = await request.json();
  const supabaseAdmin = useSupabaseAdmin;
  try {
    // token68のやつで生成する
    const token = generateToken68(200);
    // Supabaseの設定により、それぞれにUUIDが送られてくるはずなので、それを利用する
    const { data, error } = await supabaseAdmin
      .from("signup_issue")
      .insert({ serverId, token })
      .select("token")
      .single();
    if (error) throw error;

    return new NextResponse(
      JSON.stringify({ success: true, message: "ok", generatedToken: token }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
