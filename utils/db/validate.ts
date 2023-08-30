import { useSupabaseAdmin } from "../supabaseAdmin";

export async function validateAPIKey(key: string, ip: string) {
  const supabase = useSupabaseAdmin;
  try {
    const { count, error } = await supabase
      .from("server_internal")
      .select("*", { count: "exact", head: true })
      .eq("apiKey", key)
      .eq("serverIP", ip);

    if (error) throw error;
    console.log(`Access: ${key} ; ${ip} ; ${count}`);
    if (count != 1) {
      throw new Error(
        "Something is wrong. May be you should refresh key or server id"
      );
    }
    return true;
  } catch (error) {
    throw error;
  }
}
