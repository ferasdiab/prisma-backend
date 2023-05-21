import express from "express";

const attachmentRouter = express.Router();

import { createAttachment } from "../controllers/attachment";

attachmentRouter.post("/createAttachment", createAttachment);

export default attachmentRouter;
