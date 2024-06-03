import { IController } from "../protocols";
import {  IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUserRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `${error}`,
      };
    }
  }
}
