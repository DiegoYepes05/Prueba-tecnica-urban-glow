import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  name_c: string;
  description: string;
  category: string;
  full_name: string;
}
export default function CardService({ title, name_c, description, category, full_name }: Props) {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>

          <CardDescription>Nombre del cliente: {name_c}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <h2>{description}</h2>
          <p>{category}</p>
          <p>Nombre del profesional: {full_name}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>
            <Check /> Aceptado
          </Button>
          <Button>Rechazado</Button>
          <Button>Ver detalles</Button>
        </CardFooter>
      </Card>
    </>
  );
}
