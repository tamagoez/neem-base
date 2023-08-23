import { Heading, Text, Link } from "../common/chakra-ui";
import NextLink from "next/link";

export default function () {
  return (
    <>
      <Heading>管理者向け</Heading>
      <Text>
        こちらのページは各インスタンスの管理者向けとなっています。
        <br />
        管理者アカウントで
        <Link as={NextLink} href="/login">
          ログイン
        </Link>
        してください。
      </Text>
    </>
  );
}
