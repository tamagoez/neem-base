import React from "react";

export default function ({
  tokenid,
  validated,
}: {
  tokenid: string;
  validated: boolean;
}) {
  if (validated) {
    return <></>;
  } else {
    return <></>;
  }
}

export const getServerSideProps = async () => {
  const tokenid = "";
  const validated = false;
  return {
    props: {
      tokenid,
      validated,
    },
  };
};
