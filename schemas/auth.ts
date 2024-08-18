import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "Введите ваш email",
    })
    .email("Неверный формат email"),
  password: z.string({
    message: "Введите пароль",
  }),
});

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const password = z
  .string({ message: "Введите пароль" })
  .regex(passwordRegex, "Пароль слишком простой");

const refinePassword = (
  data: {
    password: string;
  },
  ctx: z.RefinementCtx
) => {
  if (data.password.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Пароль слишком простой",
      path: ["password"],
    });
  }
};

export const registerSchema = z
  .object({
    email: z
      .string({
        message: "Введите ваш email",
      })
      .email("Неверный формат email"),
    name: z
      .string({
        message: "Введите имя пользователя",
      })
      .max(255, {
        message: "Имя должно быть не более 255 символов",
      }),
    password,
    confirmPassword: z.string({
      message: "Подтвердите пароль",
    }),
  })
  .superRefine(refinePassword);

export const confirmSchema = z
  .object({
    password: z.string({
      message: "Введите пароль",
    }),
    confirmPassword: z.string({
      message: "Подтвердите пароль",
    }),
  })
  .superRefine(refinePassword);

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ConfirmSchema = z.infer<typeof confirmSchema>;
