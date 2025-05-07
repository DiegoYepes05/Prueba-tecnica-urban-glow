"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "sonner";
import { createProfesional } from "@/actions/professional/professional";
import { CreateProfessional } from "@/interfaces/create.profesional.interface";

const professionalFormSchema = z.object({
  full_name: z.string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre no puede exceder 100 caracteres" }),
  city: z.string()
    .min(3, { message: "La ciudad debe tener al menos 3 caracteres" })
    .max(50, { message: "La ciudad no puede exceder 50 caracteres" }),
  specialty: z.string()
    .min(3, { message: "La especialidad debe tener al menos 3 caracteres" })
    .max(50, { message: "La especialidad no puede exceder 50 caracteres" }),
  contact: z.string()
    .min(3, { message: "El contacto debe tener al menos 3 dígitos" })
    .max(7, { message: "El contacto no puede exceder 7 dígitos" })
    .regex(/^\d+$/, { message: "El contacto debe contener solo números" }),
  photo: z.any().optional()
});

type ProfessionalFormValues = z.infer<typeof professionalFormSchema>;

export default function ProfessionalForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  

  const form = useForm<ProfessionalFormValues>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      full_name: "",
      city: "",
      specialty: "",
      contact: "",
      photo: undefined
    },
  });
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen no debe exceder 5MB");
        e.target.value = '';
        return;
      }
      

      form.setValue("photo", file);
      

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const processImage = (base64String: string | null): string | undefined => {
    if (!base64String) return undefined;
    

    const base64Data = base64String.split(',')[1];
    return base64Data;
  };
  

  const onSubmit = async (values: ProfessionalFormValues) => {
    setIsSubmitting(true);
    
    try {

      const processedPhoto = processImage(photoPreview);
      
      const professionalData: CreateProfessional = {
        full_name: values.full_name,
        city: values.city,
        specialty: values.specialty,
        contact: parseInt(values.contact, 10), 
        photo: processedPhoto
      };
      
      console.log("Enviando datos:", {
        ...professionalData,
        photo: processedPhoto ? "[Imagen en base64]" : undefined
      });
      
      const result = await createProfesional(professionalData);
      
      if(result) {
        toast.success("Profesional creado exitosamente");

        router.push("/dashboard/professional"); 
      } else {

        toast.error("No se pudo crear el profesional. La respuesta del servidor no fue exitosa.");
      }
     
    } catch (error) {
      console.error("Error al crear profesional:", error);
      let errorMessage = "No se pudo crear el profesional";
      
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Nuevo Profesional</CardTitle>
            <CardDescription>
              Registra un nuevo profesional en el sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej. Medellín" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej. Estilista" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="Ej. 3001234567" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Número telefónico de contacto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo de foto - Manejo especial */}
            <FormItem>
              <FormLabel>Foto (opcional)</FormLabel>
              <FormControl>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormDescription>
                Sube una foto del profesional (máx. 5MB)
              </FormDescription>
              <FormMessage />
              
              {photoPreview && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Vista previa:</p>
                  <div className="mt-1 relative rounded-md overflow-hidden w-24 h-24">
                    <img 
                      src={photoPreview} 
                      alt="Vista previa" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </FormItem>
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
              {isSubmitting ? "Registrando..." : "Registrar Profesional"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}