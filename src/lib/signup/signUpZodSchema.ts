import { z } from "zod";

export const signUpZodSchema = z
  .object({
    username: z
      .string()
      .min(3, "A felhasználónév legalább 3 karakter kell legyen."),
    email: z.string().email("Helytelen emailcím formátum"),
    password: z
      .string()
      .min(6, "Legalább 6 karakter hosszúságú jelszót adj meg"),
    confirm: z
      .string()
      .min(6, "Legalább 6 karakter hosszúságú jelszót adj meg"),
  })
  .refine((values) => values.password === values.confirm, {
    message: "A jelszavak nem egyeznek",
    path: ["confirm"],
  });
