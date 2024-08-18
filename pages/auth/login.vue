<script setup lang="ts">
import type { LoginSchema } from "~/schemas/auth";

const { fetch } = useUserSession();

const { error, isLoading, handleMutate } = useMutation<LoginSchema>({
  path: "/auth/login",
  onSuccess: async () => {
    await fetch();
    await navigateTo("/app");
  },
  onError: (err) => {
    console.log(err);
  },
});

const handleSubmit = async (data: LoginSchema) => {
  await handleMutate(data);
};
</script>

<template>
  <SharedFormCard link="/auth/register">
    <template #title> Вход в систему </template>
    <template #description>
      Введите ваш email и пароль для входа в систему
    </template>
    <template #default>
      <AuthLogin @submit="handleMutate" :error="error" :loading="isLoading" />
    </template>

    <template #footer> Нет аккаунта? </template>
    <template #footer-link> Регистрация </template>
  </SharedFormCard>
</template>
