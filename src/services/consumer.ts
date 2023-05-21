import prisma from "../../script";
import { Prisma } from "@prisma/client";

export const createConsumerService = async (name: string) => {
  try {
    return await prisma.consumer.create({
      data: {
        name,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getConsumersService = async (name: string) => {
  let whereCondition: Prisma.ConsumerWhereInput = { isDeleted: false };
  if (name) {
    whereCondition = {
      ...whereCondition,
      name: {
        path: "$.en",
        string_contains: name,
        // mode: "insensitive",
      },
    };
  }

  const users = await prisma.consumer.findMany({
    where: whereCondition,
    include: {
      Appointments: true,
      ConsumerBasket: {
        include: {
          Package: true,
          ConsumerBasketService: {
            include: {
              Service: true,
            },
          },
        },
      },
      Attachment: true,
    },
  });

  return users;
};
