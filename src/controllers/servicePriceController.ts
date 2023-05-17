import { Request, Response } from "express";
import prisma from "../../script";

export const createServicePrice = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { providerId, serviceId, price } = req.body;
    const servicePrice = await prisma.servicePrice.create({
      data: {
        providerId: providerId,
        serviceId: serviceId,
        price: price,
      },
    });

    res.status(200).json(servicePrice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateServicePrice = async (req: Request, res: Response) => {
  try {
    const { id, price } = req.body;
    const servicePrice = await prisma.servicePrice.update({
      where: { id: id },
      data: {
        price,
      },
    });
    res.status(200).json(servicePrice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getServicePrice = async (req: Request, res: Response) => {
  try {
    const servicePrice = await prisma.servicePrice.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        privider: true,
        service: true,
      },
    });
    res.status(200).json(servicePrice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
