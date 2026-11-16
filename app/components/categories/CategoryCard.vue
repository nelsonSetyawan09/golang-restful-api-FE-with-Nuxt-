<script setup lang="ts">
import type { Category } from "@/types/category";

interface Props {
  category: Category;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [category: Category];
}>();

const handleClick = () => {
  emit("select", props.category);
};
</script>

<template>
  <button
    type="button"
    class="w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md"
  >
    <!-- Content -->
    <div class="p-4">
      <h3 class="mb-2 text-lg font-semibold text-gray-800">
        category ID: {{ props.category?.id }}
      </h3>

      <p class="mb-4 text-sm text-gray-600">
        {{ props.category?.name }}
      </p>
    </div>
    <div class="flex gap-2 justify-end items-center">
      <button
        type="button"
        class="flex items-center text-red-400 transition hover:text-red-600 bg-gray-100 p-2 rounded-sm cursor-pointer"
      >
        <Icon name="lucide:trash" size="20" />
      </button>
      <button
        type="button"
        class="flex items-center text-gray-500 transition hover:text-gray-700 bg-gray-100 p-2 rounded-sm cursor-pointer"
        @click="handleClick"
      >
        <Icon name="lucide:pencil-line" size="20" />
      </button>
    </div>
  </button>
</template>
