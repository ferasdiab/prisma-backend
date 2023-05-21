import { CreateAppointmentData } from "../types/appoitment";

import {
  createAppointmentService,
  getAppointmentsservice,
} from "../services/appoitment";

export const createAppointmentBusiness = async (
  data: CreateAppointmentData
) => {
  return createAppointmentService(data);
};

export const getAppointmentsBusiness = async (
  id: string,
  consumerId: string,
  serviceId: string,
  limit: number,
  page: number
) => {
  const { appointments, totalItems } = await getAppointmentsservice(
    id,
    consumerId,
    serviceId,
    limit,
    page
  );
  const totalPages = Math.ceil(totalItems / limit || 1);
  return { totalItems, totalPages, rows: appointments };
};
