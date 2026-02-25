import bcrypt from "bcryptjs";
import { User } from "../module/user.model";
import { generateToken } from "../../../utils/jwt";

export class UserService {

  static async createUser(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    return await User.create({
      ...data,
      password: hashed
    });
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(
      password,
      user.getDataValue("password")
    );

    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken({ id: user.getDataValue("id") });

    return { token };
  }

  static async getUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}