import { User } from "../../models/users";

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}


export interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
