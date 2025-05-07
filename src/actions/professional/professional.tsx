'use server'

import { PrismaClient } from "@/generated/prisma";
import { CreateProfessional } from "@/interfaces/create.profesional.interface";

const prisma = new PrismaClient();

export const createProfesional = async (data: CreateProfessional) => {
  try {
    const response = await prisma.users.create({
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getProfessionals = async () => {
  try {
    const response = await prisma.users.findMany({
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
