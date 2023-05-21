export interface CreateAppointmentData {
  consumerId: string;
  providerId: string;
  date: string;
  timeTo: string;
  timeFrom: string;
  bookingThrough: Record<string, any>;
  priority: Record<string, any>;
  serviceIds: string[];
}
