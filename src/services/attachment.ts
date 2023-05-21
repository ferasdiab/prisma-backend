import prisma from "../../script";

export const createAttachmentService = async (
  url: string,
  name: string,
  consumerId: string,
  providerId: string,
  serviceId: string
) => {
  return await prisma.attachment.create({
    data: {
      url,
      name,
      consumerId: consumerId || undefined,
      providerId: providerId || undefined,
      serviceId: serviceId || undefined,
    },
  });
};
