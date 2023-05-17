import express from "express";

const servicePriceRouter = express.Router();

import {
  createServicePrice,
  getServicePrice,
  updateServicePrice,
} from "../controllers/servicePriceController";
servicePriceRouter.post("/createServicePrice", createServicePrice);
servicePriceRouter.post("/updateServicePrice", updateServicePrice);

servicePriceRouter.get("/getServicePrice", getServicePrice);

export default servicePriceRouter;
