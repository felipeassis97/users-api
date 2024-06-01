import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";

config();
const app = express();

const port = process.env.PORT || 8000;

app.get("/users", async (req, res) => {
  const repository = new MongoGetUsersRepository();
  const controller = new GetUsersController(repository);
  const { body, statusCode } = await controller.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
