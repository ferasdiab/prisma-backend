import express from "express";
const app = express();
app.use(express.json());

import consumerRouter from "./src/routers/consumerRouter";
import providerRouter from "./src/routers/providerRouter";
import serviceRouter from "./src/routers/serviceRouter";
import appoitmentRouter from "./src/routers/appoitmentRouter";
import servicePriceRouter from "./src/routers/servicePriceRouter";
import packageRouter from "./src/routers/packageRouter";
import attachmentRouter from "./src/routers/attachmentRouter";

app.use("/consumer", consumerRouter);
app.use("/provider", providerRouter);
app.use("/service", serviceRouter);
app.use("/appoitment", appoitmentRouter);
app.use("/servicePrice", servicePriceRouter);
app.use("/package", packageRouter);
app.use("/attachment", attachmentRouter);

export default app;
