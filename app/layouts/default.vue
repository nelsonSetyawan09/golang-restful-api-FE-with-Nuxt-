<script setup lang="ts">
const route = useRoute();

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "🏠",
  },
  {
    name: "Categories",
    path: "/",
    icon: "📁",
  },
];

const sidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300"
      :class="
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      "
    >
      <!-- Logo -->
      <div
        class="flex h-16 items-center justify-between border-b border-gray-100 px-6"
      >
        <h1 class="text-xl font-bold text-indigo-600">Golang Rest API</h1>

        <button
          @click="sidebarOpen = false"
          class="text-xl text-gray-400 lg:hidden"
        >
          ×
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-4 py-6">
        <p
          class="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400"
        >
          Menu
        </p>

        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          @click="sidebarOpen = false"
          class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition"
          :class="
            route.path === item.path
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          "
        >
          <span class="text-lg">{{ item.icon }}</span>

          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Sidebar Footer -->
      <div class="border-t border-gray-100 p-4">
        <div class="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600"
          >
            P
          </div>

          <div>
            <p class="text-xs text-gray-500">Pengaturan</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="min-h-screen lg:pl-64">
      <!-- Navbar -->
      <header
        class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8"
      >
        <div class="flex items-center gap-3">
          <!-- Mobile Menu -->
          <button
            @click="sidebarOpen = true"
            class="text-xl text-gray-600 lg:hidden"
          >
            ☰
          </button>

          <h2 class="text-sm font-semibold text-gray-700">
            Categories Dashboard
          </h2>
        </div>

        <!-- Navbar Right -->
        <div class="flex items-center gap-4">
          <button
            class="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            🔔

            <span
              class="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
            />
          </button>

          <div class="hidden h-8 border-l border-gray-200 sm:block" />

          <div class="flex items-center gap-2">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600"
            >
              A
            </div>

            <span class="hidden text-sm font-medium text-gray-700 sm:block">
              Admin
            </span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
