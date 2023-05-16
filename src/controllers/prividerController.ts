import { Request, Response } from "express";
import prisma from "../../script";

export const createProvider = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    const provider = await prisma.provider.create({
      data: {
        name,
      },
    });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getProviders = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    const providers = await prisma.provider.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        Appointments: true,
      },
    });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
