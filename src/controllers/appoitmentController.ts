import { Request, Response } from "express";
import prisma from "../../script";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const {
      consumerId,
      providerId,
      date,
      timeTo,
      timeFrom,
      bookingThrough,
      priority,
      serviceIds,
    } = req.body;

    if (!consumerId || !providerId) {
      res.status(400).json({ error: "Invalid consumerId or providerId" });
      return;
    }
    const appointment = await prisma.appointments.create({
      data: {
        providerId: providerId,
        consumerId: consumerId,
        date, // Provide a valid date
        timeTo, // Provide a valid time
        timeFrom, // Provide a valid time
        bookingThrough,
        priority, // Provide valid JSON data
        services: {
          connect: serviceIds.map((serviceId: string) => ({ id: serviceId })),
        },
      },
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const appointments = await prisma.appointments.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        consumer: true,
        provider: true,
        services: true,
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
