"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createProfesional } from "@/actions/professional/professional";
import { CreateProfessional } from "@/interfaces/create.profesional.interface";


export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    city: "",
    specialty: "",
    contact: "",
    photo: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {

        if (
          !formData.full_name.trim() ||
          !formData.city.trim() ||
          !formData.specialty.trim() ||
          !formData.contact.trim()

        ) {
          toast.error("Todos los campos son requeridos");
          setIsSubmitting(false);
          return;
        }
  
        const professionalData:CreateProfessional = {
          full_name: formData.full_name,
          city: formData.city,
          specialty: formData.specialty,
          contact: parseFloat(formData.contact),
          photo: formData.photo || undefined
        };
  
        const result = await createProfesional(professionalData);
  
        if (result) {
          toast.success("profesional creado con éxito");
          router.push("/dashboard/services/create");
        } else {
          toast.error("Error al crear el profesional");
        }
      } catch (error) {
        console.error("Error al crear profesional:", error);
        toast.error("No se pudo crear el profesional");
      } finally {
        setIsSubmitting(false);
      }
    };
  
  return (
    <Card className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Nuevo Profesional</CardTitle>
          <CardDescription>
            Registra un nuevo profesional en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Nombre completo</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ej. Medellín"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidad</Label>
            <Input
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Ej. Estilista"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Contacto</Label>
            <Input
              id="contact"
              name="contact"
              type="number"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Ej. 3001234567"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo">Foto (opcional)</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.photo && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Vista previa:</p>
                
              </div>
            )}
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
            {isSubmitting ? "Registrando..." : "Registrar Profesional"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}