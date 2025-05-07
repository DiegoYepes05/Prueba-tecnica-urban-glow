"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getCategories } from "@/actions/category/category";

import { createService } from "@/actions/service/service";
import { CreateService } from "@/interfaces/create.service.interface";
import { CreateCategory } from "@/interfaces/create.category.interface";
import { getProfessionals } from "@/actions/professional/professional";
import {  Professional } from "@/interfaces/create.profesional.interface";


export default function ServiceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<CreateCategory[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]); 
  const [formData, setFormData] = useState({
    title: "",
    name_c: "",
    description: "",
    price: "",
    categoriesId: "",
    usersId: "", 
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoriesId: value === "none" ? "" : value,
    }));
  };

  const handleProfessionalChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      usersId: value === "none" ? "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      if (
        !formData.title.trim() ||
        !formData.name_c.trim() ||
        !formData.description.trim() ||
        !formData.price ||
        !formData.usersId 
      ) {
        toast.error("Todos los campos son requeridos");
        setIsSubmitting(false);
        return;
      }

      const serviceData: CreateService = {
        title: formData.title,
        name_c: formData.name_c,
        description: formData.description,
        price: parseFloat(formData.price),
        categoriesId: formData.categoriesId || undefined,
        usersId: formData.usersId, 
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
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Nuevo Servicio</CardTitle>
          <CardDescription>
            Crea un nuevo servicio para tus clientes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del servicio</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. Corte de Cabello"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name_c">Nombre del cliente</Label>
            <Input
              id="name_c"
              name="name_c"
              value={formData.name_c}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoriesId">Seleccionar categoría</Label>
            <Select
              value={formData.categoriesId || "none"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin categoría</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usersId">Seleccionar profesional</Label>
            <Select
              value={formData.usersId || "none"}
              onValueChange={handleProfessionalChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un profesional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin asignar</SelectItem>
                {professionals.map((professional) => (
                  <SelectItem key={professional.id} value={professional.id}>
                    {professional.full_name} - {professional.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe detalladamente este servicio"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
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
            {isSubmitting ? "Creando..." : "Crear Servicio"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}