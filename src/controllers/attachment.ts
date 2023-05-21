import { Request, Response } from "express";

import { createAttachmentService } from "../services/attachment";

export const createAttachment = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { url, name, consumerId, providerId, serviceId } = req.body;

    const newAttachment = await createAttachmentService(
      url,
      name,
      consumerId,
      providerId,
      serviceId
    );

    res.status(200).json(newAttachment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
