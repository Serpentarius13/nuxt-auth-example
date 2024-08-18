// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-auth-utils",
    "@vee-validate/nuxt",
    "@nuxt/icon",
  ],

  vite: {
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
  },
  css: ["assets/css/main.css"],
});
