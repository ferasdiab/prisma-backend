import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();
export default prisma;

const startServer = async () => {
  await prisma.$connect();

  // Call the main logic here

  // Start the Express server
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer().catch((e) => {
  console.log(e.message);
});
