import { Category } from "./category.interface";

export interface Service {
    id: string;
    title: string;
    name_c: string;
    category: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    categories?: Category | null;
    categoriesId?: string | null;
  }