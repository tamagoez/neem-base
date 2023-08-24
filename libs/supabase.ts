import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export function useClientSupabase() {
  return createPagesBrowserClient();
}

export async function getUserid() {
  return (await createPagesBrowserClient().auth.getUser()).data.user.id;
}
