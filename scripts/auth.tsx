import { useClientSupabase } from "../libs/supabase";

export async function loginClient(email: string, password: string) {
  const supabase = useClientSupabase();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
  } catch (error: any) {
    console.error(error);
  }
}

export async function signupClient(
  email: string,
  password: string,
  redirectId: string
) {
  const supabase = useClientSupabase();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `https://neemsbase.vercel.app/auth/emailCallback?id=${redirectId}`,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    console.error(error);
  }
}
