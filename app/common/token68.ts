"use server";
import crypto from "crypto";

export function generateToken68(length: number) {
  // どうやら128文字くらいが丁度いいらしい...?
  // 96文字にしてしまいます。。。
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
