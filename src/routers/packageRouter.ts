import express from "express";

const packageRouter = express.Router();

import {
  createPackage,
  getPackage,
  payPackage,
} from "../controllers/packageController";

packageRouter.post("/createPackage", createPackage);
packageRouter.get("/getPackage", getPackage);
packageRouter.post("/payPackage", payPackage);

export default packageRouter;
