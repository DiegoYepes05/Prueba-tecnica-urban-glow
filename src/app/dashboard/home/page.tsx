"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

function Page() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No has iniciado sesión
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md border-0 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="p-6 text-center space-y-4">
            <h2 className="text-xl font-medium text-gray-700">Bienvenido</h2>

            <div className="bg-gray-50 rounded-lg py-4 px-4 border border-gray-100 flex flex-col items-center space-y-3">
              <div className="rounded-full overflow-hidden h-20 w-20 border-2 border-teal-500">
                <Image
                  width={80}
                  height={80}
                  src={user.imageUrl}
                  alt={user.fullName || "Usuario"}
                  className="object-cover h-full w-full"
                  unoptimized
                />
              </div>

              <p className="text-teal-600 font-medium">
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <p className="text-teal-600 font-medium text-lg">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Gracias por unirte a Urban Glow
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
