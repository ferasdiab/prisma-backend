import express from "express";

const appoitmentRouter = express.Router();

import {
  createAppointment,
  getAppointments,
} from "../controllers/appoitmentController";

appoitmentRouter.post("/createAppointment", createAppointment);
appoitmentRouter.get("/getAppointments", getAppointments);

export default appoitmentRouter;
