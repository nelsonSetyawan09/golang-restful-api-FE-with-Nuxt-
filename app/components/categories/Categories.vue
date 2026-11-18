<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
  >
    <Cate-CategoryCard
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @select="emit('select', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category } from "@/types/category";
defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  select: [category: Category];
  delete: [category: Category];
}>();
</script>
