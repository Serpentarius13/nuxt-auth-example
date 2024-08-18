<script setup lang="ts">
const { clear } = useUserSession();

const handleLogout = async () => {
  await clear();
  navigateTo("/auth/login");
};

const handleLogin = () => {
  navigateTo("/auth/login");
};
</script>

<template>
  <AuthState #default="{ loggedIn, user }">
    <div class="items-center flex gap-5" v-if="loggedIn">
      <div class="flex items-center gap-2">
        <Icon name="material-symbols:in-home-mode-rounded" class="w-8 h-8" />
        Привет, {{ user?.username }}!
      </div>

      <Button variant="ghost" @click="handleLogout" class="gap-2">
        <Icon name="material-symbols:logout-rounded" /> Выйти
      </Button>
    </div>
    <Button v-else @click="handleLogin" class="gap-2">
      <Icon name="material-symbols:login-rounded" />
      Войти
    </Button>
  </AuthState>
</template>
