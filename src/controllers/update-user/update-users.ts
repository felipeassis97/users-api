import { IUpdateUsersController, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IUpdateUsersController {
  constructor(private readonly getUserRepository: IUpdateUserRepository) {}

  async handle() {
    try {
      const users = await this.getUserRepository.updateUser();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Error",
      };
    }
  }
}
