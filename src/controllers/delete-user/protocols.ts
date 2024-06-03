import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}


