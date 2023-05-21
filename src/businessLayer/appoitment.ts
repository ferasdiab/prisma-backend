import { CreateAppointmentData } from "../types/appoitment";

import { createAppointmentService } from "../services/appoitment";

export const createAppointmentBusiness = async (
  data: CreateAppointmentData
) => {
  return createAppointmentService(data);
};
