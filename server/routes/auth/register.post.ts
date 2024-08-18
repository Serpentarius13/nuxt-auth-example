import { StatusCodes } from "http-status-codes";
import { registerSchema } from "~/schemas/auth";
import { authService } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const result = await registerSchema.safeParseAsync(body);

    if (!result.success) {
      throw createError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: result.error.issues[0].message,
      });
    }

    const user = await authService.register({
      email: result.data.email,
      username: result.data.name,
      password: result.data.password,
    });

    await replaceUserSession(event, {
      user,
    });
  } catch (error) {
    handleServerError(error);
  }
});
