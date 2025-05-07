"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Home, Info, BookOpen, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SignedIn, UserButton } from "@clerk/nextjs"

const routes = [
  { name: "Inicio", path: "/dashboard/home", icon: Home },
  { name: "Categorias", path: "/dashboard/categories", icon: Info },
  { name: "Profesional", path: "/dashboard/professional", icon: Phone },

  {
    name: "Servicios",
    path: "#",
    icon: BookOpen,
    submenu: [
      { name: "Crear servicio", path: "/dashboard/services/create" },
      { name: "Ver servicios", path: "/dashboard/services" },

    ],
  },

]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        // Color fijo con gradiente, independiente del scroll
        "bg-gradient-to-r from-pink-500 to-violet-600 shadow-md py-3"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard/home" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl">
            PT
          </div>
          <span className="font-bold text-xl text-white">
         Prueba técnica
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {routes.map((route) => {
            if (route.submenu) {
              return (
                <DropdownMenu key={route.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-full transition-all",
                        "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {route.name} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48 rounded-xl p-2">
                    {route.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          href={subItem.path}
                          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium hover:bg-violet-50"
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={route.name}
                href={route.path}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  pathname === route.path
                    ? "bg-white text-violet-600" // Resaltado con fondo blanco para la ruta activa
                    : "text-white/90 hover:text-white hover:bg-white/10", // Texto blanco para las rutas inactivas
                )}
              >
                {route.name}
              </Link>
            )
          })}
        </nav>

        <SignedIn>
<UserButton
  appearance={{
    elements: {
      userButtonAvatarBox: "w-12 h-12",
      userButtonBox: "flex justify-center",
    },
  }}
/>
</SignedIn>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white" // Siempre blanco para contraste con el fondo
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
                      N
                    </div>
                    <span className="font-bold text-xl">NavBrand</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Cerrar menú</span>
                    </Button>
                  </SheetTrigger>
                </div>
              </div>

              <nav className="flex-1 overflow-auto py-6 px-6">
                <ul className="space-y-6">
                  {routes.map((route) => (
                    <li key={route.name}>
                      {route.submenu ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-lg font-medium">
                            <route.icon className="h-5 w-5 text-violet-500" />
                            {route.name}
                          </div>
                          <ul className="pl-8 space-y-3 border-l border-gray-100">
                            {route.submenu.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.path}
                                  className="text-gray-600 hover:text-violet-600 transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={route.path}
                          className={cn(
                            "flex items-center gap-3 text-lg font-medium",
                            pathname === route.path ? "text-violet-600" : "text-gray-800 hover:text-violet-600",
                          )}
                        >
                          <route.icon className="h-5 w-5 text-violet-500" />
                          {route.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t mt-auto">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-full">
                  Contáctanos
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
