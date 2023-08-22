"use client";
// ページ説明
// 他のneemクライアントが、アカウントをneemsbaseを介して登録しようとしたときに表示されるページ

import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "../../common/chakra-ui";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { validateToken } from "./validate";

export default function () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [validated, setValidated] = useState<Boolean>(false);
  // 入力
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authmode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (router) {
      const querytoken = searchParams.get("token");
      setToken(querytoken);
      async () => {
        await validateToken(querytoken);
      };
    }
  }, [router]);

  // 変数
  const mailReg =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return (
    <>
      <Container>
        <Box maxW="container.sm" borderRadius={12}>
          <Center>
            <Heading>{authmode}</Heading>
          </Center>
          <FormControl isInvalid={!mailReg.test(email)}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="flushed"
              placeholder=""
            />
          </FormControl>
          <FormControl isInvalid={password.length < 10}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="flushed"
              placeholder=""
            />
          </FormControl>
          <Divider
            orientation="horizontal"
            marginTop="30px"
            marginBottom="30px"
          />
          <Center>
            <VStack align="stretch" width="100%">
              <Button colorScheme="teal">{authmode}</Button>
              <Button
                variant="outline"
                onClick={() =>
                  setAuthMode(authmode === "login" ? "signup" : "login")
                }
              >
                Change to {authmode === "login" ? "signup" : "login"}
              </Button>
            </VStack>
          </Center>
        </Box>
      </Container>
    </>
  );
}
