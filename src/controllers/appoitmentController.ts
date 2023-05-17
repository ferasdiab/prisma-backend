import { Request, Response } from "express";
import prisma from "../../script";
import { Prisma } from "@prisma/client";

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

export const addServiceToAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId, serviceId } = req.body;
    const appointment = await prisma.appointments.update({
      where: { id: appointmentId },
      data: {
        services: {
          connect: [{ id: serviceId }],
        },
      },
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteServiceFromAppointment = async (
  req: Request,
  res: Response
) => {
  try {
    const { appointmentId, serviceId } = req.body;
    const appointment = await prisma.appointments.update({
      where: { id: appointmentId },
      data: {
        services: {
          disconnect: [{ id: serviceId }],
        },
      },
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await prisma.appointments.update({
      where: { id: appointmentId },
      data: {
        isDeleted: true,
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
    const { id, consumerId, serviceId } = req.body;
    let whereCondition: Prisma.AppointmentsWhereInput = { isDeleted: false };
    if (id) {
      whereCondition = { ...whereCondition, id };
    }
    if (consumerId) {
      whereCondition = {
        ...whereCondition,
        consumer: {
          is: {
            id: consumerId,
          },
        },
      };
    }
    if (serviceId) {
      whereCondition = {
        ...whereCondition,
        services: {
          some: { id: serviceId },
        },
      };
    }
    const appointments = await prisma.appointments.findMany({
      where: whereCondition,
      include: {
        consumer: true,
        provider: true,
        services: true,
      },
    });
    res.status(200).json({ count: appointments.length, rows: appointments });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
