import express from "express";

const consumerRouter = express.Router();

import {
  createConsumer,
  getConsumers,
} from "../controllers/consumerController";

consumerRouter.post("/createConsumer", createConsumer);
consumerRouter.get("/getConsumers", getConsumers);

export default consumerRouter;
