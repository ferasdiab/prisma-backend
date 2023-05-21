import { Request, Response } from "express";
import prisma from "../../script";
import { Prisma } from "@prisma/client";

export const createConsumer = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    const user = await prisma.consumer.create({
      data: {
        name,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getConsumers = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    let whereCondition: Prisma.ConsumerWhereInput = { isDeleted: false };
    if (name) {
      whereCondition = {
        ...whereCondition,
        name: {
          path: "$.en",
          string_contains: name,
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
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
