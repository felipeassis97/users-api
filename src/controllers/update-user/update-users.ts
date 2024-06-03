import { User } from "../../models/users";
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
        return {
        statusCode: 400,
        body: "Error: Body missing fields.",
      };
    }
      if (!id) {
        return {
          statusCode: 400,
          body: "Error: Missing user id.",
        };
      }
      const allowedFieldsToUpdate = ["firstname", "lastname", "password"];
      const someFieldNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Error: Some received field is not allowed.",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `${error}`,
      };
    }
  }
}
