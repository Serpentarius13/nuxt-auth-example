export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();

  if (user.value) {
    if (user.value.requiresConfirmation) {
      return navigateTo("/auth/confirm");
    }

    return navigateTo("/app");
  }

  return navigateTo("/auth/login");
});
