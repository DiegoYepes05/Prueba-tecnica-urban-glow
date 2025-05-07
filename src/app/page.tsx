import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { CheckCircle, Link } from "lucide-react";

export default function Home() {
  return (
   
<main className="flex-1 flex justify-center">
  <div className="max-w-3xl w-full mx-auto">
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center">
              El arte del cabello perfecto en tus manos
            </h1>
            <p className="text-muted-foreground md:text-xl mx-auto">
              En Urban Glow transformamos tu imagen con cortes modernos, coloración profesional y tratamientos capilares que realzan tu belleza natural.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <SignedOut>
              <SignInButton
                mode="modal"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                  },
                }}
              >
                <button className="w-full bg-black text-white hover:bg-black/90 rounded-xl h-12 tracking-wider font-light cursor-pointer">
                  Reservar cita
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
                <button className="w-full border border-black text-black hover:bg-black/5 rounded-xl h-12 tracking-wider font-light cursor-pointer">
                  Crear cuenta
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
          
          <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] mx-auto mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-70 blur-3xl"></div>
            <div className="absolute inset-4 bg-white dark:bg-black rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-center p-4">Transforma tu look y renueva tu confianza</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Nuestros Servicios Estrella</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descubre por qué nuestros clientes confían en nuestros estilistas para lucir siempre increíbles.
            </p>
          </div>
        
          <div className="grid gap-8 w-full max-w-md mx-auto">
            <div className="grid gap-1">
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Cortes Personalizados</h3>
              </div>
              <p className="text-muted-foreground">Diseñamos el corte perfecto según tu rostro, estilo y personalidad.</p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Coloración Profesional</h3>
              </div>
              <p className="text-muted-foreground">
                Técnicas avanzadas de color con productos premium que cuidan tu cabello.
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Tratamientos Capilares</h3>
              </div>
              <p className="text-muted-foreground">Recupera la salud y brillo de tu cabello con nuestros tratamientos intensivos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Únete a Nuestra Comunidad Beauty</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Suscríbete para recibir consejos de belleza, promociones exclusivas y reservar citas prioritarias.
            </p>
          </div>
          <div className="w-full max-w-sm mx-auto space-y-2">
            <form className="flex space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Ingresa tu email"
                type="email"
              />
              <Button type="submit" className="h-10">
                Recibir ofertas
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              Al suscribirte, recibirás un 15% de descuento en tu primer servicio y aceptas nuestros{" "}
              <Link className="underline underline-offset-2" href="#">
                Términos y Condiciones
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

  );
}