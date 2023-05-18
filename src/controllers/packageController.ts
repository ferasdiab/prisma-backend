import { Request, Response } from "express";
import prisma from "../../script";

export const createPackage = async (req: Request, res: Response) => {
  try {
    // Your logic to fetch users from the database using Prisma
    const { name, serviceIds, totalPrice } = req.body;

    const newPackage = await prisma.package.create({
      data: {
        name,
        totalPrice,
      },
    });
    for (let i = 0; i < serviceIds.length; i++) {
      const { id, quantity } = serviceIds[i];
      const newPackaeService = await prisma.serviceInPackage.create({
        data: {
          packageId: newPackage.id,
          serviceId: id,
          quantity: quantity,
        },
      });
    }

    res.status(200).json(newPackage);
  } catch (error) {
    console.log("error.message");
    res.status(500).json({ error: error });
  }
};

export const updateServicePrice = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPackage = async (req: Request, res: Response) => {
  try {
    const packages = await prisma.package.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        // service: true,
        services: {
          include: {
            service: {
              include: {
                ServicePrice: true,
              },
            },
          },
        },
        ConsumerBasket: true,
      },
    });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const payPackage = async (req: Request, res: Response) => {
  try {
    const { consumerId, packageId } = req.body;

    const newConsumerBasket = await prisma.consumerBasket.create({
      data: {
        consumerId,
        packageId,
      },
      include: {
        Package: {
          include: {
            services: true,
          },
        },
      },
    });
    if (newConsumerBasket.Package)
      for (let i = 0; i < newConsumerBasket.Package.services.length; i++) {
        const element = newConsumerBasket.Package.services[i];
        console.log("element", element);
        if (element)
          await prisma.consumerBasketService.create({
            data: {
              consumerBasketId: newConsumerBasket.id,
              used: false,
              serviceId: element.serviceId,
            },
          });
      }

    res.status(200).json(newConsumerBasket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
