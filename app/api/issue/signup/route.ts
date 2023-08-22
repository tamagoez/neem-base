"use server";

// Request Method
//
// apikey -> middleware.tsで捌く
// secret => 確認用のsecret
// token => 識別用のtoken

import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  const res = await request.json();
  return NextResponse.json({});
}
