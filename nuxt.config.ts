// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  compatibilityDate: "2024-01-01",
  modules: ["nuxt-build-cache"]
});