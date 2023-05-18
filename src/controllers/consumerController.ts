import { Request, Response } from "express";
import prisma from "../../script";

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
    const users = await prisma.consumer.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        Appointments: true,
        ConsumerBasket: {
          include: {
            Package: true,
            ConsumerBasketService: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
