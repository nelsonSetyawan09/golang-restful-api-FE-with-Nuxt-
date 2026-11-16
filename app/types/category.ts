export interface Category {
  id: number;
  name: string;
}

export interface CategoryRequest {
  name: string;
}

export interface CategoryResponse {
  code: number;
  status: string;
  message: string;
  data: Category;
}

export interface CategoryListResponse {
  code: number;
  status: string;
  message: string;
  data: Category[];
}

export enum EditOrCreate {
  EDIT = "Edit",
  CREATE = "Create",
}
