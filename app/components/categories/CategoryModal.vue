<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="closeModal"
    >
      <div class="w-full max-w-md rounded-xl bg-white shadow-xl">
        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            {{ isEditing ? "Edit Category" : "Add Category" }}
          </h2>

          <button
            type="button"
            class="text-gray-400 transition hover:text-gray-700 cursor-pointer"
            @click="closeModal"
          >
            <Icon name="lucide:x" size="20" class="cursor-pointer" />
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitCategory">
          <div class="space-y-4 px-6 py-5">
            <!-- Category Name -->
            <div>
              <label
                for="category-name"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>

              <input
                id="category-name"
                v-model="formName"
                type="text"
                placeholder="Enter category name"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4"
          >
            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              @click="closeModal"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="submitting || !formName.trim()"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ submitting ? "Saving..." : isEditing ? "Update" : "Save" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Category } from "@/types/category";

import { categoryService } from "@/services/categoryService";
const { loading, errMsg } = useCategory();

interface Props {
  modelValue: boolean;
  isEditing?: boolean;
  selectedId?: number | null;
  submitting: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
  selectedId: null,
  submitting: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submitCategory: [category: Category | null];
}>();

const category = ref<Category | null>(null);
const formName = ref("");

const fetchCategory = async () => {
  if (!props.selectedId) {
    formName.value = "";
    category.value = null;
    return;
  }
  loading.value = true;
  errMsg.value = "";

  try {
    const response = await categoryService.getById(props.selectedId);
    category.value = response.data;
    formName.value = response.data.name;
  } catch (error) {
    errMsg.value = "Something went wrong";
    category.value = null;
    formName.value = "";
  } finally {
    loading.value = false;
  }
};

// Mengisi form ketika edit category
watch(
  () => [props.modelValue, props.isEditing, props.selectedId],
  () => {
    if (!props.modelValue) return;

    if (props.isEditing && props.selectedId) {
      fetchCategory();
    } else {
      formName.value = "";
      category.value = null;
    }
  },
  { immediate: true },
);

const submitCategory = () => {
  const name = formName.value.trim();
  if (!name || props.submitting) return;
  if (props.isEditing && category.value) {
    category.value = {
      ...category.value,
      name,
    };
  } else {
    category.value = {
      id: 0,
      name,
    } as Category;
  }

  emit("submitCategory", category.value);
};

// Close modal
const closeModal = () => {
  formName.value = "";
  category.value = null;
  emit("update:modelValue", false);
};
</script>
