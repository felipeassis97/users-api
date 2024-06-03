import { User } from "../../models/users";
import { badRequest, internalError, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Error: Missing user id.");
      }

      const user = await this.deleteUserRepository.deleteUser(id);
      return ok(user);
   
    } catch (error) {
      return internalError(`${error}`)
    }
  }
}
