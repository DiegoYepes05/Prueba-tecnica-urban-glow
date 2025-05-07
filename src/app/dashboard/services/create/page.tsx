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
import { Loader2 } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CreateCategory[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

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
      setIsLoading(true);
      setLoadError(null);
      
      try {
        // Obtener datos de categorías y profesionales
        const categoriesData = await getCategories();
        console.log('Categorías cargadas:', categoriesData);
        setCategories(categoriesData || []);
        
        // Obtener datos de profesionales con manejo específico
        const professionalsData = await getProfessionals();
        console.log('Profesionales cargados:', professionalsData);
        
        if (!professionalsData || professionalsData.length === 0) {
          console.warn('No se encontraron profesionales');
          toast.warning('No hay profesionales registrados en el sistema');
        }
        
        setProfessionals(professionalsData || []);
      } catch (error) {
        console.error("Error detallado al cargar datos:", error);
        setLoadError("Error al cargar datos necesarios");
        toast.error("Error al cargar datos necesarios para el formulario");
      } finally {
        setIsLoading(false);
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
        categoriesId: values.categoriesId === "no-category" ? undefined : values.categoriesId,
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

  // Función para renderizar mensaje de error o estado de carga
  const renderLoadingOrError = () => {
    if (loadError) {
      return (
        <div className="p-4 text-center">
          <p className="text-red-500">{loadError}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Reintentar
          </Button>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="p-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Cargando datos del formulario...</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="max-w-xl mx-auto">
      {renderLoadingOrError()}
      
      {!isLoading && !loadError && (
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
                        <SelectItem value="no-category">Sin categoría</SelectItem>
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
                      disabled={professionals.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            placeholder={
                              professionals.length === 0 
                                ? "No hay profesionales disponibles" 
                                : "Selecciona un profesional"
                            } 
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {professionals.length > 0 ? (
                          professionals.map((professional) => (
                            <SelectItem 
                              key={professional.id} 
                              value={professional.id}
                            >
                              {professional.full_name || 'Profesional'} - {professional.specialty || 'Sin especialidad'}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-professionals" disabled>
                            No hay profesionales disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {professionals.length === 0 && (
                      <FormDescription className="text-amber-500">
                        No se encontraron profesionales. Debes crear al menos uno antes de continuar.
                      </FormDescription>
                    )}
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
              <Button 
                type="submit" 
                disabled={isSubmitting || professionals.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : "Crear Servicio"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </Card>
  );
}