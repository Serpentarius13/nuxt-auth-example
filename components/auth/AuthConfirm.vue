<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { confirmSchema, type ConfirmSchema } from "~/schemas/auth";

interface Props {
  error?: string;
  loading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{ (event: "submit", data: ConfirmSchema): void }>();

const form = useSchemedForm({ schema: confirmSchema });

const onSubmit = form.handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <form @submit="onSubmit" class="flex gap-2 flex-col">
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Введите пароль</FormLabel>
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

    <SharedLoadingButton :loading="loading" type="submit" class="my-2"
      >Создать аккаунт</SharedLoadingButton
    >

    <SharedFormError :error="error" class="mt-2" />
  </form>
</template>
