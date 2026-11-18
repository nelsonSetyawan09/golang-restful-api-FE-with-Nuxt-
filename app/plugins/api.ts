export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      "X-API-KEY": config.public.xApiKey,
    },
  });

  return {
    provide: {
      api,
    },
  };
});
