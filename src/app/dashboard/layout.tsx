"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/navbar/navbar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex pt-16"> {}

        <main className="flex-1 w-full">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

          