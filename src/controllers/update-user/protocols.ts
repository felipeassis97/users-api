import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateUsersController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

export interface UpdateUserParams {
  firstname: string;
  lastname: string;
  password: string;
}
