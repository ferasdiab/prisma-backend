import { Request, Response } from "express";
import prisma from "../../script";

export const createService = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    const service = await prisma.service.create({
      data: {
        name,
      },
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getservices = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const services = await prisma.service.findMany({
      where: {
        isDeleted: false,
        appoitment: {
          some: { isDeleted: false },
        },
      },
      include: {
        appoitment: true,
      },
    });


    const updatedServices = services.map((service) => {
      const filteredAppointments = service.appoitment.filter(
        (appointment) => !appointment.isDeleted
      );
      return { ...service, appoitment: filteredAppointments };
    });

    res.status(200).json(updatedServices);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
