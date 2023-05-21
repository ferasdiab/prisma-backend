import { Request, Response } from "express";
import prisma from "../../script";
import { Prisma } from "@prisma/client";
import { createAppointmentBusiness } from "../businessLayer/appoitment";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await createAppointmentBusiness(req.body);

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
    const { id, consumerId, serviceId, limit, page } = req.body;
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

    let appointmentsQuery: Prisma.AppointmentsFindManyArgs = {
      where: whereCondition,
      include: {
        consumer: true,
        provider: true,
        services: true,
      },
    };

    //// end  of  data filter

    if (limit && page) {
      const skip = (page - 1) * limit;
      const take = limit;

      appointmentsQuery = {
        ...appointmentsQuery,
        skip,
        take,
      };
    }

    const appointments = await prisma.appointments.findMany(appointmentsQuery);

    let totalItems = 0;
    totalItems = await prisma.appointments.count({ where: whereCondition });
    const totalPages = Math.ceil(totalItems / limit || 1);

    res.status(200).json({ totalItems, totalPages, rows: appointments });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
