"use server";

// Request Method
//
// apikey -> middleware.tsで捌く
// serverId -> サーバーを一応仕分ける

import { NextResponse } from "next/server";
import { useSupabaseAdmin } from "../../../../utils/supabaseAdmin";

export async function POST(request: Request) {
  const { serverId } = await request.json();
  const supabaseAdmin = useSupabaseAdmin;
  try {
    // Supabaseの設定により、それぞれにUUIDが送られてくるはずなので、それを利用する
    const { data, error } = await supabaseAdmin
      .from("signup_issue")
      .insert({ serverId, token: undefined })
      .select()
      .single();
    if (error) throw error;
    // 生成されたUUIDを使いまわす
    const requestId = data.requestId;

    return new NextResponse(JSON.stringify({ success: true, message: "ok" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
