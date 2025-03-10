<script setup lang="ts">
import type { Pet } from "../scripts/types";

const props = defineProps<{
  pet: Pet;
}>();

const emit = defineEmits<{
    (event: 'delete', id: number): void;
    (event: 'update', pet: Pet): void;
}>();

const deletePet = () => {
  emit('delete', props.pet.id);
};

const editPet = () => {
  emit('update', props.pet);
};
</script>

<template>
    <div class="card container my-3">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ props.pet.name }}</h5>
                <div>
                    <span class="badge bg-primary">{{ props.pet.animalType }}</span>
                    <span class="badge bg-secondary ms-2">{{ props.pet.race }}</span>
                </div>
            </div>
            
            <p class="card-text mt-3"><strong>Description:</strong> {{ props.pet.description }}</p>
            <p class="card-text"><strong>Prix:</strong> {{ props.pet.price }} €</p>
            <p class="card-text"><strong>Stock:</strong> {{ props.pet.stock }}</p>
            
            <button @click="deletePet" class="btn btn-danger mt-2">Supprimer</button>
            <button @click="editPet" class="btn btn-warning mt-2 ms-2">Modifier</button>
        </div>
    </div>
</template>

<style>
</style>
