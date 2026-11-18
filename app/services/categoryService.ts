import type { CategoryRequest, CategoryListResponse } from "~/types/category";

export const categoryService = {
  // GET All
  getAll() {
    const { $api } = useNuxtApp();
    return $api<CategoryListResponse>("/");
  },

  // GET By ID
  getById(id: number) {
    const { $api } = useNuxtApp();
    return $api<CategoryResponse>(`/${id}`);
  },

  // POST
  create(data: CategoryRequest) {
    const { $api } = useNuxtApp();
    return $api("/", {
      method: "POST",
      body: data,
    });
  },

  // PUT
  update(id: number, data: CategoryRequest) {
    const { $api } = useNuxtApp();
    return $api(`/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  // DELETE
  delete(id: number) {
    const { $api } = useNuxtApp();
    return $api(`/${id}`, {
      method: "DELETE",
    });
  },
};
