"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCategory } from "@/actions/category/category";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Define el esquema de validación para la categoría
const categoryFormSchema = z.object({
  title: z.string()
    .min(2, {
      message: "El nombre de la categoría debe tener al menos 2 caracteres"
    })
    .max(50, {
      message: "El nombre de la categoría no puede tener más de 50 caracteres"
    }),
});

// Tipo inferido del esquema
type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function CategoryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Inicializar el formulario con React Hook Form y Zod
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await createCategory({ title: values.title });
      
      if (response) {
        toast.success("Categoría creada con éxito");
        router.push("/dashboard/categories");
      } else {
        toast.error("Error al crear la categoría");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="max-w-md mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Crear nueva categoría</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el nombre de la categoría" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear categoría"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}