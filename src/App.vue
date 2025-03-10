<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import PetList from "./components/PetList.vue";


</script>

<template>
  <div class="mr-3">
    <Header />
    <div class="flex-grow-1">
      <PetList />
    </div>
    <Footer />
  </div>
</template>

<style scoped>

header {
  background: #efe1dc;
}

.flex-grow-1 {
  background: #f3ece7;
}

footer {
  background: #efe1dc;
}
</style>