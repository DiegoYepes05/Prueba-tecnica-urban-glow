"use client";

import React from "react";

import {  useUser } from "@clerk/nextjs";
function Page() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  if (!isSignedIn) {
    return <div>No has iniciado sesión</div>;
  }
  return (
    <div>
      <div>

        <h1> Bienvenido {user.primaryEmailAddress?.emailAddress}</h1>

      </div>
    </div>
  );
}

export default Page;
