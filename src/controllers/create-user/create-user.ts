import validator from "validator";
import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["firstname", "lastname", "email", "password"];

      //Validate required fields
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Error: Field ${field} is required`,
          };
        }
      }

      //Validate e-mail
      const isEmailValid = validator.isEmail(httpRequest?.body?.email ?? "");
      if (!isEmailValid) {
        return {
          statusCode: 400,
          body: "Error: E-mail invalid format",
        };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
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
