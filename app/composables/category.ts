import type { Category, CategoryResponse } from "~/types/category";

export const useCategory = () => {
  const categoryResponse = ref<CategoryResponse | null>(null);
  const loading = ref(true);
  const submitting = ref(false);
  const errMsg = ref("");

  return {
    categoryResponse,
    loading,
    submitting,
    errMsg,
  };
};
