<script setup lang="ts">
  import { ref, defineEmits, watch } from "vue";
  
  const searchQuery = ref<string>("");
  const emit = defineEmits();
  
  watch(searchQuery, (newQuery) => {
    emit('search', newQuery);
  });
  </script>
  
<template>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Rechercher un animal par nom..."
        v-model="searchQuery"
      />
    </div>
  </template>
  