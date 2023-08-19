"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { validateToken } from "./validate";

export default function () {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [validated, setValidated] = useState<Boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      const querytoken = router.query.token[0];
      setToken(querytoken);
      async () => {
        await validateToken(querytoken);
      };
    }
  }, [router]);
  return <></>;
}
