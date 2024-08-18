import { UserSession } from "#auth-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { db } from "../db";
import { ServerError } from "../utils/server-error";

class AuthService {
  async getUserByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Omit<User, "password">> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ServerError("Пользователь не найден", StatusCodes.NOT_FOUND);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ServerError("Неверный пароль", StatusCodes.UNAUTHORIZED);
    }

    return _.omit(user, ["password"]);
  }

  async register({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }): Promise<Omit<User, "password">> {
    const dbUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (dbUser) {
      throw new ServerError(
        "Пользователь уже существует",
        StatusCodes.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return _.omit(user, ["password"]);
  }

  async confirm({
    session,
    password,
  }: {
    session: Exclude<UserSession["user"], undefined>;
    password: string;
  }): Promise<Omit<User, "password">> {
    const dbUser = await db.user.findUnique({
      where: {
        email: session.email,
      },
    });

    if (dbUser) {
      throw createError({
        statusCode: StatusCodes.CONFLICT,
        message: "Пользователь уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email: session.email,
        username: session.username,
        password: hashedPassword,
        provider: session.provider,
      },
    });

    return _.omit(newUser, ["password"]);
  }
}

export const authService = new AuthService();
