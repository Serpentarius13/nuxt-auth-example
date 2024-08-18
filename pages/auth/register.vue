<script setup lang="ts">
import type { RegisterSchema } from "~/schemas/auth";

const { fetch } = useUserSession();

const { error, isLoading, handleMutate } = useMutation<RegisterSchema>({
  path: "/auth/register",
  onSuccess: async () => {
    await fetch();
    await navigateTo("/app");
  },
  onError: (err) => {
    console.log(err);
  },
});

const handleSubmit = async (data: RegisterSchema) => {
  console.log("goes");
  await handleMutate(data);
};
</script>

<template>
  <SharedFormCard link="/auth/login" class="md:!max-w-md lg:!max-w-lg">
    <template #title> Регистрация </template>
    <template #description>
      Введите ваш email и пароль для регистрации на сайте
    </template>
    <template #default>
      <AuthRegister
        @submit="handleSubmit"
        :error="error"
        :loading="isLoading"
      />
    </template>

    <template #footer> Уже есть аккаунт? </template>
    <template #footer-link> Войти </template>
  </SharedFormCard>
</template>
