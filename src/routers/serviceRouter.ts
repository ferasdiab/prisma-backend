import express from "express";

const serviceRouter = express.Router();

import { createService, getservices } from "../controllers/serviceController";

serviceRouter.post("/createService", createService);
serviceRouter.get("/getservices", getservices);

export default serviceRouter;
