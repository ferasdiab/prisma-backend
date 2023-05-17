import express from "express";

const servicePriceRouter = express.Router();

import {
  createServicePrice,
  getServicePrice,
} from "../controllers/servicePriceController";

servicePriceRouter.post("/createServicePrice", createServicePrice);
servicePriceRouter.get("/getServicePrice", getServicePrice);

export default servicePriceRouter;
