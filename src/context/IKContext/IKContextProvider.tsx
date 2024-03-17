"use client";

import React from "react";
import { IKContext } from "imagekitio-react";

export default function IKContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IKContext
        publicKey={process.env.IK_PUBLIC_KEY as string}
        urlEndpoint="https://ik.imagekit.io/gi01deg7s"
        transformationPosition="path"
      >
        {children}
      </IKContext>
    </>
  );
}
