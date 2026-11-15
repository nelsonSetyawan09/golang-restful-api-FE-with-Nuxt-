import type { CategoryRequest, CategoryListResponse } from "~/types/category";

const API_URL = "http://localhost:8080/api/categories";

const api = $fetch.create({
  baseURL: API_URL,
  headers: {
    "X-API-KEY": "RAHASIA",
  },
});

export const categoryService = {
  // GET All
  getAll() {
    return api<CategoryListResponse>("/");
  },

  // GET By ID
  getById(id: number) {
    return api<CategoryResponse>(`/${id}`);
  },

  // POST
  create(data: CategoryRequest) {
    return api("/", {
      method: "POST",
      body: data,
    });
  },

  // PUT
  update(id: number, data: CategoryRequest) {
    return api(`/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  // DELETE
  delete(id: number) {
    return api(`/${id}`, {
      method: "DELETE",
    });
  },
};
