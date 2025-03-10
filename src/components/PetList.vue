<script setup lang="ts">
import { ref, computed } from "vue";
import SearchBar from "./Search.vue";
import PetForm from "./Form.vue";
import PetCard from "./Card.vue";
import type { Pet } from "../scripts/types";

const pets = ref<Pet[]>([
  {
    id: 1,
    name: "Blue",
    animalType: "Chien",
    description: "Chien très gentil et joueur",
    race: "Berger Allemand",
    price: 500,
    stock: 10,
  },
  {
    id: 2,
    name: "Louis",
    animalType: "Chat",
    description: "Chat très câlin et paresseux",
    race: "Siamois",
    price: 650,
    stock: 4,
  },
  {
    id: 3,
    name: "Tweety",
    animalType: "Oiseau",
    description: "Oiseau très bavard et coloré",
    race: "Perruche",
    price: 100,
    stock: 15,
  } // generer avec chat gpt
]); 
const selectedPet = ref<Pet | null>(null);
const searchQuery = ref<string>("");

const filteredPets = computed(() => {
  return pets.value.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleSubmit = (pet: Pet) => {
  if (selectedPet.value) {
    const index = pets.value.findIndex((p) => p.id === pet.id);
    if (index !== -1) {
      pets.value[index] = pet;
    }
  } else {
    pets.value.push(pet);
  }
  selectedPet.value = null;
};


const resetSelectedPet = () => {
  selectedPet.value = null;
};

const viewPetDetails = (pet: Pet) => {
  selectedPet.value = pet;
};

const selectPetForEditing = (pet: Pet) => {
  selectedPet.value = pet;
};

const duplicatePet = (pet: Pet) => {
  pets.value.push({ ...pet, id: Date.now() });
};

const removePet = (id: number) => {
  pets.value = pets.value.filter((pet) => pet.id !== id);
};

const closePetDetails = () => {
  selectedPet.value = null;
};

// CSV generer par chat gpt
const exportCSV = () => {
  const headers = ['ID', 'Nom', 'Type d\'animal', 'Description', 'Race', 'Prix', 'Stock'];
  const rows = pets.value.map(pet => [
    pet.id,
    pet.name,
    pet.animalType,
    pet.description,
    pet.race,
    pet.price,
    pet.stock
  ]);

  let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
  rows.forEach(row => {
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'pets_list.csv');
  document.body.appendChild(link);
  link.click();
};
</script>
<template>
  <div>
    <SearchBar @search="handleSearch" />
    <PetForm :selectedPet="selectedPet" @submit="handleSubmit" @reset="resetSelectedPet" />
    <button @click="exportCSV" class="btn btn-primary">Exporter en CSV</button>
    <div class="row mx-2">
      <PetCard
        v-for="pet in filteredPets"
        :key="pet.id"
        :pet="pet"
        @viewDetails="viewPetDetails"
        @updatePet="selectPetForEditing"
        @duplicatePet="duplicatePet"
        @deletePet="removePet"
      />
    </div>
    <Detail :selectedPet="selectedPet" @closeModal="closePetDetails" />
  </div>
</template>