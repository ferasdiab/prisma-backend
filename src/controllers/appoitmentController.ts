import { Request, Response } from "express";
import prisma from "../../script";
import { Prisma } from "@prisma/client";
import {
  createAppointmentBusiness,
  getAppointmentsBusiness,
} from "../businessLayer/appoitment";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await createAppointmentBusiness(req.body);

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { id, consumerId, serviceId, limit, page } = req.body;
    const response = await getAppointmentsBusiness(
      id,
      consumerId,
      serviceId,
      limit,
      page
    );

    res.status(200).json(response);
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
