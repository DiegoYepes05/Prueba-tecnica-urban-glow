"use server";

import { PrismaClient } from "@/generated/prisma";

import { CreateService } from "@/interfaces/create.service.interface";

const prisma = new PrismaClient();

export const getService = async () => {
  try {
    const services = await prisma.services.findMany({
      include: {
        categories: true,
        Users: {
          select: {
            full_name: true,
          },
        },
      },
    });

    return services;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  }
};

export const createService = async (data: CreateService) => {
  try {
    const services = await prisma.services.create({
      data: data,
    });

    return services;
  } catch (error) {
    console.error("Error al crear servicio:", error);
    throw error;
  }
};
