<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterSchema } from "~/schemas/auth";

interface Props {
  error?: string;
  loading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (event: "submit", data: RegisterSchema): void;
}>();

const form = useSchemedForm({
  schema: registerSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <form @submit="onSubmit" class="flex gap-2 flex-col">
    <fieldset class="grid grid-cols-2 gap-2">
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

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Имя пользователя</FormLabel>
          <FormControl>
            <Input placeholder="username2000" v-bind="componentField" />
          </FormControl>
          <FormDescription> Это ваше отображаемое имя. </FormDescription>
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
            Пароль должен состоять из не менее 8 символов и содержать буквы,
            цифры и спецсимвол.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Подтверждение пароля</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="123456G!"
              v-bind="componentField"
            />
          </FormControl>

          <FormDescription> Подтвердите пароль. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </fieldset>

    <SharedLoadingButton :loading="loading" type="submit" class="mt-2">
      Зарегестрироваться
    </SharedLoadingButton>
    <AuthProviderGoogle title="Зарегестрироваться через Google" />

    <SharedFormError :error="error" />
  </form>
</template>
