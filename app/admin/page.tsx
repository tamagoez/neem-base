"use client";

import { useEffect, useState } from "react";
import { Heading, Text, Link } from "../common/chakra-ui";
import NextLink from "next/link";
import { ServerList } from "../../interfaces/serverlist";
import { ServerItem } from "./components";
import { getAdminServerList } from "../../scripts/admin/servers";
import { getUserid } from "../../libs/supabase";

export default async function () {
  const userid = await getUserid();
  return <>{userid ? <AdminPageWithLogined /> : <AdminPageWithNoLogined />}</>;
}

async function AdminPageWithLogined() {
  const serverList = await getAdminServerList();
  return (
    <>
      <Heading>管理者向け</Heading>
      <Heading>あなたが管理しているサーバーリスト</Heading>
      {serverList.map((x) => (
        <ServerItem key={x.id} id={x.id} name={x.name} url={x.url} />
      ))}
    </>
  );
}

function AdminPageWithNoLogined() {
  return (
    <>
      <Heading>管理者向け</Heading>
      <Text>
        こちらのページは各サーバーの管理者向けとなっています。
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
