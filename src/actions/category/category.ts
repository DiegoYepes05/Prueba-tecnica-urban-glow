"use server";


import { PrismaClient } from "@/generated/prisma";
import { Category } from "@/interfaces/category.interface";

const prisma = new PrismaClient();

export const createCategory = async (data: Category) => {
  try {
    const response = await prisma.categories.create({
      data: data,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = async () => {
  try {
    const categories = await prisma.categories.findMany({});

    return categories;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
