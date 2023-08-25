"use client";

import { useState } from "react";
import AuthFormComponent from "../common/auth-form";

export default function Auth() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  return (
    <>
      <AuthFormComponent
        redirectTo="/dashabord"
        authMode={authMode}
        setAuthMode={(newState) => setAuthMode(newState)}
      />
    </>
  );
}
