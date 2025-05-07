
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/category/category";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";


export default function CategoryForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    
    try {
      const response = await createCategory({ title });
      if (response) {
        toast.success("Categoria creada con éxito");

        router.push("/dashboard/categories");
      } else {
        toast.error("Error al crear la categoría");
      }
    } catch (error) {
        console.log(error)
      toast.error("Error al crear la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Nueva Categoría</CardTitle>
          <CardDescription>
            Crea una nueva categoría para tus servicios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Peluquería"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear Categoría"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}