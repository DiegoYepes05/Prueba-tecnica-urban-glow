import {
  SignedOut,
  SignInButton,
  SignUpButton,

} from "@clerk/nextjs";
import { Scissors } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white text-black">
      <div className="w-full max-w-md mx-auto text-center space-y-10">
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-full bg-black p-4">
            <Scissors className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-light tracking-widest uppercase">
            URBAN GLOW
          </h1>
          <p className="text-gray-500 font-light tracking-wider">
            Prueba técnica
          </p>
        </div>

        <div className="h-px w-24 bg-black/20 mx-auto my-8" />

        <div className="flex flex-col space-y-4 mt-8">
          <SignedOut>
            <SignInButton
              mode="modal"
              appearance={{
                elements: {
                  rootBox: "w-full",
                },
              }}
            >
              <button className="w-full bg-black text-white hover:bg-black/90 rounded-xl h-12 tracking-wider font-light  cursor-pointer  ">
                Iniciar sesión
              </button>
            </SignInButton>

            <SignUpButton
              mode="modal"
              appearance={{
                elements: {
                  rootBox: "w-full",
                },
              }}
            >
              <button className="w-full border border-black text-black hover:bg-black/5 rounded-xl h-12 tracking-wider font-light  cursor-pointer ">
                Registrarse
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
