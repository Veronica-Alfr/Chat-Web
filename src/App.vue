<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header content="text/html; charset=utf-8" text="text/x-typescript">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>

<!-- <script setup> -->
