// paramtype
// mode:0 login
// mode:1 signup

import { generateRandomString } from "../../../utils/random";
import { supabaseAdmin } from "../../../utils/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") res.status(401).json({ success: false, message: "POST access only" });
  const mode = req.query.mode as number;
  const serverid = req.query.serverid as string;
  if (mode === 0) {
    const { data, error } = await supabaseAdmin
      .from("auth_token")
      .insert([{ serverid, mode, secret: generateRandomString(20) }])
      .select()
      .single();
    res.status(200).json({ success: true, secret: data.secret });
  } else if (mode === 1) {
    const { data, error } = await supabaseAdmin
      .from("auth_token")
      .insert([{ serverid, mode, secret: generateRandomString(20) }])
      .select()
      .single();
    res.status(200).json({ success: true, secret: data.secret });
  } else {
    tokenerror()
  }
  function tokenerror() {
    res.status(401).json({ success: false, message: "token is unvalid" });
  }
}
