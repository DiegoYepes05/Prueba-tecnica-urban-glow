import { getService } from "@/actions/service/service";
import React from "react";

import CardService from "../../../components/card/card-service";


export default async function Page() {
  const service = await getService();
  console.log(service);
  return (
    <>
    
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