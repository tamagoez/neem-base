import Link from "next/link";
import { ChakraProvider } from "@chakra-ui/react";
import Provider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
