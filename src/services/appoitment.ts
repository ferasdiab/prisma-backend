import prisma from "../../script";
import { CreateAppointmentData } from "../types/appoitment";

export const createAppointmentService = async (data: CreateAppointmentData) => {
  const {
    consumerId,
    providerId,
    date,
    timeTo,
    timeFrom,
    bookingThrough,
    priority,
    serviceIds,
  } = data;

  if (!consumerId || !providerId) {
    throw new Error("Invalid consumerId or providerId");
  }

  return prisma.appointments.create({
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
};
