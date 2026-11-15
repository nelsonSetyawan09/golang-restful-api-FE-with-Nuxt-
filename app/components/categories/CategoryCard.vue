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
    class="w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    @click="handleClick"
  >
    <!-- Content -->
    <div class="p-4">
      <h3 class="mb-2 text-lg font-semibold text-gray-800">
        {{ props.category?.name }}
      </h3>

      <p class="mb-4 text-sm text-gray-600">
        description {{ props.category?.name }}
      </p>
    </div>
  </button>
</template>
