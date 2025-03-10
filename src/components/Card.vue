<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Pet } from "../scripts/types";

const { pet } = defineProps<{ pet: Pet }>();
const emit = defineEmits<{
  (event: "viewDetails", pet: Pet): void;
  (event: "updatePet", pet: Pet): void;
  (event: "duplicatePet", pet: Pet): void;
  (event: "deletePet", id: number): void;
}>();

const viewDetails = (pet: Pet) => {
  emit("viewDetails", pet);
};

const updatePet = (pet: Pet) => {
  emit("updatePet", pet);
};

const duplicatePet = (pet: Pet) => {
  emit("duplicatePet", pet);
};

const deletePet = (id: number) => {
  emit("deletePet", id);
};
</script>
<template>
    <div class="col-12 col-md-4" :key="pet.id">
      <div class="card pet-card">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ pet.name }}</h5>
          <div class="d-flex justify-content-between">
            <span class="badge bg-primary">{{ pet.animalType }}</span>
            <span class="badge bg-secondary">{{ pet.race }}</span>
          </div>
          <div class="card-text mt-3">
            <div class="d-flex justify-content-between">
              <strong>Description:</strong>
              <span>{{ pet.description }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <strong>Prix:</strong>
              <span>{{ pet.price }} $</span>
            </div>
            <div class="d-flex justify-content-between">
              <strong>Stock:</strong>
              <span>{{ pet.stock }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-auto">
            <button @click="viewDetails(pet)" class="btn btn-info"><i class="fas fa-eye"></i></button>
            <button @click="updatePet(pet)" class="btn btn-warning"><i class="fas fa-edit"></i></button>
            <button @click="duplicatePet(pet)" class="btn btn-outline-info"><i class="fas fa-copy"></i></button>
            <button @click="deletePet(pet.id)" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  