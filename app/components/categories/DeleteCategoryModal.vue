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
      <Transition
        appear
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="modelValue"
          class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        >
          <!-- Content -->
          <div class="mt-4 text-center">
            <h2 class="text-xl font-semibold text-gray-900">
              Delete Category?
            </h2>

            <p class="mt-2 text-sm leading-relaxed text-gray-500">
              Are you sure you want to delete
              <span class="font-semibold text-gray-800">
                "{{ category?.name }}" </span
              >?
            </p>
            <p>This action cannot be undone</p>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="loading"
              @click="closeModal"
            >
              Cancel
            </button>

            <button
              type="button"
              class="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="loading"
              @click="confirmDelete"
            >
              <Icon
                v-if="loading"
                name="lucide:loader-circle"
                class="h-4 w-4 animate-spin"
              />

              {{ loading ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Category } from "@/types/category";

interface Props {
  modelValue: boolean;
  category: Category | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  category: null,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
}>();

const closeModal = () => {
  if (props.loading) return;

  emit("update:modelValue", false);
};

const confirmDelete = () => {
  if (props.loading) return;

  emit("confirm");
};
</script>
