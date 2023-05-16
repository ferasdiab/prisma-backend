import express from "express";
const app = express();
app.use(express.json());

import consumerRouter from "./src/routers/consumerRouter";
import providerRouter from "./src/routers/providerRouter";
import serviceRouter from "./src/routers/serviceRouter";
import appoitmentRouter from "./src/routers/appoitmentRouter";

app.use("/consumer", consumerRouter);
app.use("/provider", providerRouter);
app.use("/service", serviceRouter);
app.use("/appoitment", appoitmentRouter);

export default app;
