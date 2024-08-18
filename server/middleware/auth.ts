import { StatusCodes } from "http-status-codes";
import { protectedRoutes } from "../config/protected-routes";

export default defineEventHandler(async (event) => {
  const route = event.path;

  if (route in protectedRoutes) {
    const user = await getUserSession(event);

    if (!user.user) {
      throw createError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "Вы не авторизованы",
      });
    }
  }
});
