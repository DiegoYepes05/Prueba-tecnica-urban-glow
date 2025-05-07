import { getService } from "@/actions/service/service";
import React from "react";

import CardService from "../../../components/card/card-service";

export default async function Page() {
  const service = await getService();
  console.log(service);
  
  return (
    <>
      {service && service.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4">
          {service.map((item) => (
            <CardService
              key={item.id}
              title={item.title}
              description={item.description}
              name_c={item.name_c}
              category={item.categories?.title ?? ""}
              full_name={item.Users?.full_name ?? ""}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
            <svg 
              className="w-16 h-16 mx-auto text-gray-400 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay servicios disponibles</h3>
            <p className="text-gray-600">
              En este momento no hay servicios disponibles para mostrar. Por favor, crea uno.
            </p>
          </div>
        </div>
      )}
    </>
  );
}