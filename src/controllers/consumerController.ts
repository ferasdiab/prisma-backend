import { Request, Response } from "express";
import prisma from "../../script";
import { Prisma } from "@prisma/client";
import {
  createConsumerService,
  getConsumersService,
} from "../services/consumer";

export const createConsumer = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    const user = await createConsumerService(name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getConsumers = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name } = req.body;
    const users = await getConsumersService(name);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
