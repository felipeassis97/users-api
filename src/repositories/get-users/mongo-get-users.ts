import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Felipe",
        lastName: "Assis",
        email: "felipeassis97@gmail.com",
        password: "123456",
      },
    ];
  }
}
