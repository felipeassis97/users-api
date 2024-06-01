import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  const app = express();
  await MongoClient.connect();

  //Routes
  app.get("/users", async (req, res) => {
    const repository = new MongoGetUsersRepository();
    const controller = new GetUsersController(repository);
    const { body, statusCode } = await controller.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
