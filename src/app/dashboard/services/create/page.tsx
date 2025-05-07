"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { getCategories } from "@/actions/category/category";
import { createService } from "@/actions/service/service";
import { CreateService } from "@/interfaces/create.service.interface";
import { CreateCategory } from "@/interfaces/create.category.interface";
import { getProfessionals } from "@/actions/professional/professional";
import { Professional } from "@/interfaces/create.profesional.interface";

const serviceFormSchema = z.object({
  title: z.string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(100, { message: "El título no puede exceder 100 caracteres" }),
  name_c: z.string()
    .min(3, { message: "El nombre del cliente debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre del cliente no puede exceder 100 caracteres" }),
  description: z.string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, { message: "La descripción no puede exceder 500 caracteres" }),
  price: z.string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "El precio debe ser un número válido y mayor o igual a 0",
    }),
  categoriesId: z.string().optional(),
  usersId: z.string()
    .min(1, { message: "Debe seleccionar un profesional" }),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<CreateCategory[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      name_c: "",
      description: "",
      price: "",
      categoriesId: "",
      usersId: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, professionalsData] = await Promise.all([
          getCategories(),
          getProfessionals(),
        ]);
        
        setCategories(categoriesData || []);
        setProfessionals(professionalsData || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar datos necesarios");
      }
    }

    fetchData();
  }, []);

  const onSubmit = async (values: ServiceFormValues) => {
    setIsSubmitting(true);
    
    try {
      const serviceData: CreateService = {
        title: values.title,
        name_c: values.name_c,
        description: values.description,
        price: parseFloat(values.price),
        categoriesId: values.categoriesId || undefined,
        usersId: values.usersId,
      };

      const result = await createService(serviceData);

      if (result) {
        toast.success("Servicio creado con éxito");
        router.push("/dashboard/services");
      } else {
        toast.error("Error al crear el servicio");
      }
    } catch (error) {
      console.error("Error al crear servicio:", error);
      toast.error("No se pudo crear el servicio");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Nuevo Servicio</CardTitle>
            <CardDescription>
              Crea un nuevo servicio para tus clientes
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del servicio</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej. Corte de Cabello" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name_c"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del cliente</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej. Juan Pérez" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="categoriesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccionar categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sin categoría">Sin categoría</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Opcional: Selecciona una categoría para este servicio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="usersId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccionar profesional</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un profesional" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {professionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id}>
                          {professional.full_name} - {professional.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe detalladamente este servicio" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      min="0"
                      placeholder="0.00" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {isSubmitting ? "Creando..." : "Crear Servicio"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}