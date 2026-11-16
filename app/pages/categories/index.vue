<template>
  <div class="min-h-screen">
    <div class="min-h-screen bg-gray-100 p-8 rounded-md shadow-md">
      <div class="mb-4 flex justify-end">
        <button
          class="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 cursor-pointer"
          @click="showModalCreateCard"
        >
          Create Card
        </button>
      </div>
      <div>
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <p class="text-gray-500">Loading categories...</p>
        </div>

        <!-- Error -->
        <div
          v-else-if="errMsg"
          class="flex flex-col justify-center items-center py-20"
        >
          <p class="text-red-500 mb-3">{{ errMsg }}</p>

          <button
            @click="fetchCategories"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>

        <!-- Empty -->
        <div
          v-else-if="categories.length === 0"
          class="flex flex-col justify-center items-center py-20"
        >
          <p class="text-gray-500 text-lg">No categories found.</p>

          <p class="text-gray-400 text-sm mt-1">
            Start by adding your first category.
          </p>
        </div>

        <Cate-Categories
          :categories="categories"
          @select="handleSelectCategory"
        />
      </div>
    </div>

    <!-- Modal -->
    <Cate-CategoryModal
      v-model="showModal"
      :selected-id="selectedId"
      :edit-or-create="editOrCreate"
      :submitting="submitting"
      @submit-category="handleCreateOrUpdateCategory"
    />
  </div>
</template>

<script lang="ts" src="./index.controller.ts" />
