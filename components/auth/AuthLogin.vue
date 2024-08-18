<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { configure, useForm } from "vee-validate";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginSchema } from "~/schemas/auth";

interface Props {
  error?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (event: "submit", data: LoginSchema): void;
}>();

const formSchema = toTypedSchema(loginSchema);

configure({
  validateOnBlur: false,
  validateOnInput: false,
});

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <form @submit="onSubmit" class="flex gap-2 flex-col">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Почта</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="mail@example.com"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="123456G!"
            v-bind="componentField"
          />
        </FormControl>

        <FormDescription>
          Пароль должен состоять из не менее 8 символов и содержать буквы, цифры
          и спецсимвол.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="w-full flex flex-col">
      <Button type="submit" class="my-2"> Войти </Button>
      <AuthProviderGoogle title="Войти через Google" />
    </div>

    <SharedFormError :error="error" class="mt-2" />
  </form>
</template>
