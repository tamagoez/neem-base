"use server";
import crypto from "crypto";

export async function generateToken68(length: number) {
  // どうやら128文字くらいが丁度いいらしい...?
  // Supabaseに合わせて220文字にしようと思います
  // やっぱ128文字
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/";
  const randomBytes = crypto.randomBytes(length);

  let token = "";
  for (let i = 0; i < randomBytes.length; i++) {
    const randomIndex = randomBytes[i] % charset.length;
    token += charset.charAt(randomIndex);
  }

  return token;
}
