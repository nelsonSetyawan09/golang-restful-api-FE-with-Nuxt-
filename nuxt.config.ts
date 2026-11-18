import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },
  modules: ["@nuxt/icon"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
  components: [
    {
      path: "~/components/categories",
      prefix: "Cate-",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    // Private environment variables
    // Hanya tersedia di server

    public: {
      apiBaseUrl: process.env.API_URL,
      xApiKey: process.env.X_API_KEY,
    },
  },
});
