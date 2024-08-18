import { H3Error } from "h3";
import { StatusCodes } from "http-status-codes";

export class ServerError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleServerError = (err: unknown) => {
  console.log(err);

  if (err instanceof ServerError) {
    throw createError({
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof H3Error) {
    throw createError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }

  throw createError({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Произошла непредвиденная ошибка",
  });
};

export const SERVER_ERRORS = {
  UNAUTHORIZED: {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: "Не авторизован",
  },
} as const;
