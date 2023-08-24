"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm({ redirectTo }: { redirectTo: string }) {
  const supabase = createClientComponentClient();

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="light"
      showLinks={false}
      providers={[]}
      redirectTo={`https://neemsbase.vercel.app/auth/callback?redirectTo=${redirectTo}`}
    />
  );
}
