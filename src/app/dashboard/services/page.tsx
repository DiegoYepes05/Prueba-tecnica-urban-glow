import { getService } from "@/actions/service/service";
import React from "react";

import CardService from "../../../components/card/card-service";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const service = await getService();
  console.log(service);
  return (
    <>
      <div className="flex flex-col sm:flex-row space-between items-start sm:items-center justify-between mb-4 px-2 sm:px-4">
        <Button className="mb-4 bg-green-700 hover:bg-green-500 w-full sm:w-auto">
          <Link href='/dashboard/services/create' className="w-full flex justify-center">
            Agregar servicio
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4">
        {service.map((item) => (
          <CardService
            key={item.id}
            title={item.title}
            description={item.description}
            name_c={item.name_c}
            category={item.categories?.title ?? ''}
            full_name={item.Users?.full_name ?? ''}
          />
        ))}
      </div>
    </>
  );
}