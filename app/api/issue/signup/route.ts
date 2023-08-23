"use server";

// Request Method
//
// apikey -> middleware.tsで捌く
// secret => 確認用のsecret
// token => 識別用のtoken

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    throw new Error();
    return new NextResponse(JSON.stringify({ success: true, message: "ok" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
