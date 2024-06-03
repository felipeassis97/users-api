import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-users";
import { UpdateUserController } from "./controllers/update-user/update-users";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  //Routes
  app.get("/users", async (req, res) => {
    const repository = new MongoGetUsersRepository();
    const controller = new GetUsersController(repository);
    const { body, statusCode } = await controller.handle();
    res.status(statusCode).send(body);
  });

  app.post("/user", async (req, res) => {
    const repository = new MongoCreateUserRepository();
    const controller = new CreateUserController(repository);
    const { body, statusCode } = await controller.handle({ body: req.body });
    res.status(statusCode).send(body);
  });

  app.patch("/user/:id", async (req, res) => {
    const repository = new MongoUpdateUserRepository();
    const controller = new UpdateUserController(repository);
    const { body, statusCode } = await controller.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.delete("/user/:id", async (req, res) => {
    const repository = new MongoDeleteUserRepository();
    const controller = new DeleteUserController(repository);
    const { body, statusCode } = await controller.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
