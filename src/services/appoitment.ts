import prisma from "../../script";
import { Prisma } from "@prisma/client";

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

export const getAppointmentsservice = async (
  id: string,
  consumerId: string,
  serviceId: string,
  limit: number,
  page: number
) => {
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
  const [appointments, totalItems] = await Promise.all([
    prisma.appointments.findMany(appointmentsQuery),
    prisma.appointments.count({ where: whereCondition }),
  ]);

  return { appointments, totalItems };
};
