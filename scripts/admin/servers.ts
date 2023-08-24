// サーバー関連

import { getUserid, useClientSupabase } from "../../libs/supabase";

const supabase = useClientSupabase();

export async function getAdminServerList() {
  try {
    const userid = getUserid();
    const { data, error } = await supabase
      .from("server_members")
      .select("id, name, url")
      .eq("userid", userid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    alert("エラーが発生しました");
  }
}
