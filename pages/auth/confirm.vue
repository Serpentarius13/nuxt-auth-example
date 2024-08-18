<script setup lang="ts">
import { type ConfirmSchema } from "~/schemas/auth";

const { fetch } = useUserSession();

const { error, isLoading, handleMutate } = useMutation<ConfirmSchema>({
  path: "/auth/confirm",
  onSuccess: async () => {
    await fetch();
    await navigateTo("/app");
  },
  onError: (err) => {
    console.log(err);
  },
});

const handleSubmit = async (data: ConfirmSchema) => {
  await handleMutate(data);
};

definePageMeta({
  middleware: ["confirm"],
});
</script>

<template>
  <SharedFormCard link="/auth/login">
    <template #title> Вход в систему </template>
    <template #description>
      Введите ваш email и пароль для входа в систему
    </template>
    <template #default>
      <AuthConfirm @submit="handleSubmit" :error="error" :loading="isLoading" />
    </template>
  </SharedFormCard>
</template>
