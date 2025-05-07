
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from 'sonner';

interface Props {
  title: string;
  name_c: string;
  description: string;
  category: string;
  full_name: string;
}

export default function CardService({ title, name_c, description, category, full_name }: Props) {
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg md:text-xl line-clamp-2 break-words">
          {title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Nombre del cliente: <span className="font-medium">{name_c}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow grid gap-2 sm:gap-4">
        <div className="text-sm sm:text-base line-clamp-3 break-words">
          {description}
        </div>
        
        <div className="grid gap-1 text-xs sm:text-sm mt-2">
          <div className="flex gap-2">
            <span className="font-semibold">Categoría:</span> 
            <span className="text-gray-600">{category}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="font-semibold">Profesional:</span> 
            <span className="text-gray-600 break-words">{full_name}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button size="sm" className="flex items-center justify-center bg-green-600 hover:bg-green-500" 
        onClick={() => toast.success('Servicio aceptado')}
        
        >
          <Check className="h-4 w-4 mr-1" /> 
          <span className="text-xs sm:text-sm">Aceptar</span>

        </Button>
        
        <Button size="sm" className="flex items-center justify-center bg-red-600 hover:bg-red-500" onClick={() => toast.error('Servicio rechazado')}>
          <X className="h-4 w-4 mr-1" /> 
          <span className="text-xs sm:text-sm">Rechazar</span>
        </Button>
        
        <Button size="sm" className="flex items-center justify-center">
          <Eye className="h-4 w-4 mr-1" /> 
          <span className="text-xs sm:text-sm">Detalles</span>
        </Button>
      </CardFooter>
    </Card>
  );
}