import { configure } from "vee-validate";
import type { z } from "zod";

interface Opts<T extends Record<PropertyKey, unknown>> {
  schema: z.Schema<T> | z.ZodEffects<z.Schema<T>>;
}

export const useSchemedForm = <T extends Record<PropertyKey, unknown>>({
  schema,
}: Opts<T>) => {
  const formSchema = toTypedSchema(schema);

  configure({
    validateOnBlur: false,
    validateOnInput: false,
  });

  const form = useForm({
    validationSchema: formSchema,
  });

  return form;
};
