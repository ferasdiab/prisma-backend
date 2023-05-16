import express from "express";

const providerRouter = express.Router();

import {
  createProvider,
  getProviders,
} from "../controllers/prividerController";

providerRouter.post("/createProvider", createProvider);
providerRouter.get("/getProviders", getProviders);

export default providerRouter;
