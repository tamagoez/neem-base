"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  StackDivider,
  VStack,
} from "./chakra-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginClient } from "../../scripts/auth";

export default function AuthFormComponent({
  redirectTo,
  authMode,
  setAuthMode,
}: {
  redirectTo: string;
  authMode: "login" | "signup";
  setAuthMode: any;
}) {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isEmailError =
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  const isPasswordError = password === "";

  const handleAction = async () => {
    if (authMode === "login") {
      try {
        await loginClient(email, password);
        window.localStorage.setItem("redirectTo", redirectTo)
        location.replace(`https://${location.hostname}/auth/callback`)
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };
  return (
    <>
      <FormControl isInvalid={isEmailError}>
        <FormLabel textColor="black">Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailError ? (
          <></>
        ) : (
          <FormErrorMessage>メールを入力してください</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={isPasswordError}>
        <FormLabel textColor="black">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordError ? (
          <></>
        ) : (
          <FormErrorMessage>パスワードを入力してください</FormErrorMessage>
        )}
      </FormControl>
      <StackDivider borderColor="gray.200" marginTop="5px" marginBottom="5px" />
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        marginTop="14px"
      >
        <Button colorScheme="teal" onClick={() => handleAction()}>
          {authMode === "login" ? "ログイン" : "新規登録"}
        </Button>
        <Button
          onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        >
          {authMode === "login" ? "新規登録 " : "ログイン "}に切り替える
        </Button>
      </VStack>
    </>
  );
}
