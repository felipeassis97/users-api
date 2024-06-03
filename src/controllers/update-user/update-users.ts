import { User } from "../../models/users";
import { badRequest, internalError, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  IUpdateUserRepository,
  UpdateUserParams
} from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
    const id = httpRequest?.params?.id;
    const body = httpRequest?.body;
try {
      if(!body) {
        return badRequest("Error: Body missing fields.");
      }
      if (!id) {
        return badRequest("Error: Missing user id.");
      }

      const allowedFieldsToUpdate = ["firstname", "lastname", "password"];
      const someFieldNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldNotAllowedToUpdate) {
        return badRequest("Error: Some received field is not allowed.");
      }

      const user = await this.updateUserRepository.updateUser(id, body);
     
     return ok(user);
    } catch (error) {
      return internalError(`${error}`);
    }
  }
}
