<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Pet } from "../scripts/types";

const props = defineProps<{
  selectedPet: Pet | null;
}>();

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const closeModal = () => {
  emit("closeModal");
};
</script>
<template>
  <div class="modal fade" id="Detail" tabindex="-1" aria-labelledby="petDetailsModalLabel" aria-hidden="true" v-if="props.selectedPet">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="petDetailsModalLabel">Détails de l'animal</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div v-if="props.selectedPet">
            <p><strong>Nom:</strong> {{ props.selectedPet.name }}</p>
            <p><strong>Type:</strong> {{ props.selectedPet.animalType }}</p>
            <p><strong>Race:</strong> {{ props.selectedPet.race }}</p>
            <p><strong>Description:</strong> {{ props.selectedPet.description }}</p>
            <p><strong>Prix:</strong> {{ props.selectedPet.price }} €</p>
            <p><strong>Stock:</strong> {{ props.selectedPet.stock }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>