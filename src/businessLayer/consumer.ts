import { getConsumersService } from "../services/consumer";

export const getConsumersBusiness = async (name: string) => {
  // Additional business logic can be added here

  // Call the service function
  return getConsumersService(name);
};
