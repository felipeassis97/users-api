import validator from "validator";
import { User } from "../../models/users";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "./protocols";
import { badRequest, created, internalError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstname", "lastname", "email", "password"];
      
      //Validate body
      if(!httpRequest.body) {
        return badRequest("Error: Body missing fields.");
      }

      //Validate required fields
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Error: Field ${field} is required`);
        }
      }

      //Validate e-mail
      const isEmailValid = validator.isEmail(httpRequest?.body?.email ?? "");
      if (!isEmailValid) {
        return badRequest("Error: E-mail invalid format");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body
      );
      return created(user);
    } catch (error) {
      return internalError(`${error}`);
    }
  }
}
