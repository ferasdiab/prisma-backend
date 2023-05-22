import { getConsumersService } from "../services/consumer";

export const getConsumersBusiness = async (
  name: string,
  ageFrom: number,
  ageTo: number
) => {
  // Additional business logic can be added here

  // Call the service function
  return getConsumersService(name, ageFrom, ageTo);
};
