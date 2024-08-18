import { StatusCodes } from "http-status-codes";
import { loginSchema } from "~/schemas/auth";
import { authService } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const result = await loginSchema.safeParseAsync(body);

    if (!result.success) {
      throw createError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: result.error.issues[0].message,
      });
    }

    const user = await authService.login({
      email: result.data.email,
      password: result.data.password,
    });

    await replaceUserSession(event, {
      user,
    });
  } catch (error) {
    handleServerError(error);
  }
});
