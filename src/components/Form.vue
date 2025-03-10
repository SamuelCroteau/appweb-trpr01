<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from "vue";
  import type { Pet, AnimalType } from "../scripts/types";
  
  const { selectedPet } = defineProps<{ selectedPet: Pet | null }>();
  const emit = defineEmits<{
    (event: "submit", pet: Pet): void;
    (event: "reset"): void;
  }>();
  
  const newName = ref<string>("");
  const newAnimalType = ref<AnimalType | null>(null);
  const newRace = ref<string>("");
  const newPrice = ref<number>(0);
  const newDescription = ref<string>("");
  const newStock = ref<number>(0);
  
  const errorMessages = ref({
    name: "",
    animalType: "",
    race: "",
    price: "",
    description: "",
    stock: "",
  });
  
  const validateForm = () => {
    errorMessages.value.name = newName.value ? "" : "Le nom est requis.";
    errorMessages.value.animalType = newAnimalType.value ? "" : "Le type d'animal est requis.";
    errorMessages.value.race = newRace.value ? "" : "La race est requise.";
    errorMessages.value.price = newPrice.value > 0 ? "" : "Le prix doit être supérieur à zéro.";
    errorMessages.value.description = newDescription.value ? "" : "La description est requise.";
    errorMessages.value.stock = newStock.value >= 0 ? "" : "Le stock ne peut pas être de zéro ou négatif à l'initialization de l'animal .";
    return Object.values(errorMessages.value).every((message) => message === "");
  };
  
  const onSubmit = () => {
    if (!validateForm()) {
      return;
    }
    const newPet: Pet = {
      id: selectedPet ? selectedPet.id : Date.now(),
      name: newName.value,
      animalType: newAnimalType.value as AnimalType,
      race: newRace.value,
      price: newPrice.value,
      description: newDescription.value,
      stock: newStock.value,
    };
    emit("submit", newPet);
  };
  
  watch(() => selectedPet, (pet) => {
    if (pet) {
      newName.value = pet.name;
      newAnimalType.value = pet.animalType;
      newRace.value = pet.race;
      newPrice.value = pet.price;
      newDescription.value = pet.description;
      newStock.value = pet.stock;
    } else {
      resetForm();
    }
  });
  
  const resetForm = () => {
    newName.value = "";
    newAnimalType.value = null;
    newRace.value = "";
    newPrice.value = 0;
    newDescription.value = "";
    newStock.value = 0;
    emit("reset");
  };
  </script>
  
<template>
    <div class="card p-3 mb-5">
      <h5 class="h4 mb-3">{{ selectedPet ? "Modifier un animal" : "Ajouter un animal" }}</h5>
      <div class="row g-3">
        <div class="col-4">
          <label for="name">Nom</label>
          <input type="text" class="form-control" v-model="newName" />
          <small v-if="errorMessages.name" class="text-danger">{{ errorMessages.name }}</small>
        </div>
        <div class="col-4">
          <label for="animalType">Type d'animal</label>
          <select class="form-control" v-model="newAnimalType">
            <option value="">Sélectionner un type</option>
            <option value="Chien">Chien</option>
            <option value="Chat">Chat</option>
            <option value="Oiseau">Oiseau</option>
            <option value="Poisson">Poisson</option>
            <option value="Rongeur">Rongeur</option>
            <option value="Reptile">Reptile</option>
          </select>
          <small v-if="errorMessages.animalType" class="text-danger">{{ errorMessages.animalType }}</small>
        </div>
        <div class="col-4">
          <label for="race">Race de l'animal</label>
          <input type="text" class="form-control" v-model="newRace" />
          <small v-if="errorMessages.race" class="text-danger">{{ errorMessages.race }}</small>
        </div>
        <div class="col-4">
          <label for="price">Prix</label>
          <input type="number" class="form-control" placeholder="Prix" v-model="newPrice" />
          <small v-if="errorMessages.price" class="text-danger">{{ errorMessages.price }}</small>
        </div>
        <div class="col-4">
          <label for="description">Description</label>
          <textarea class="form-control" v-model="newDescription"></textarea>
          <small v-if="errorMessages.description" class="text-danger">{{ errorMessages.description }}</small>
        </div>
        <div class="col-4">
          <label for="stock">Stock</label>
          <input type="number" class="form-control" placeholder="Stock" v-model="newStock" />
          <small v-if="errorMessages.stock" class="text-danger">{{ errorMessages.stock }}</small>
        </div>
      </div>
      <button class="btn btn-primary mt-3" @click="onSubmit">
        {{ selectedPet ? "Modifier" : "Ajouter" }}
      </button>
    </div>
  </template>
  
  