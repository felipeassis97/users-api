import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
