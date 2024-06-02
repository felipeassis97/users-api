import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/users";
import { ObjectId } from "mongodb";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;
    return {
      id: _id.toHexString(),
      ...rest,
    };
  }

  // async getUsers(): Promise<User[]> {
  //   const users = await MongoClient.db
  //     .collection<Omit<User, "id">>("users")
  //     .find({})
  //     .toArray();

  //   return users.map(({ _id, ...rest }) => ({
  //     ...rest,
  //     id: _id.toHexString(),
  //   }));
  // }
}