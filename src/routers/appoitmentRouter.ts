import express from "express";

const appoitmentRouter = express.Router();

import {
  createAppointment,
  getAppointments,
  addServiceToAppointment,
  deleteServiceFromAppointment,
  deleteAppointment,
} from "../controllers/appoitmentController";

appoitmentRouter.post("/createAppointment", createAppointment);
appoitmentRouter.post("/addServiceToAppointment", addServiceToAppointment);
appoitmentRouter.post(
  "/deleteServiceFromAppointment",
  deleteServiceFromAppointment
);
appoitmentRouter.get("/getAppointments", getAppointments);
appoitmentRouter.post("/deleteAppointment", deleteAppointment);

export default appoitmentRouter;
