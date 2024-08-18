import { StatusCodes } from "http-status-codes";
import { confirmSchema } from "~/schemas/auth";
import { authService } from "~/server/services/auth";
import { SERVER_ERRORS, handleServerError } from "~/server/utils/server-error";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const result = await confirmSchema.safeParseAsync(body);

    if (!result.success) {
      throw createError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: result.error.issues[0].message,
      });
    }

    const session = await getUserSession(event);

    if (!session.user) {
      throw createError(SERVER_ERRORS.UNAUTHORIZED);
    }

    const newUser = await authService.confirm({
      session: session.user,
      password: result.data.password,
    });

    setResponseStatus(event, StatusCodes.CREATED);

    await replaceUserSession(event, {
      user: newUser,
    });
  } catch (error) {
    handleServerError(error);
  }
});
