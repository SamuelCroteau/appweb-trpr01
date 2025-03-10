export interface Pet {
  id: number;
  name: string;
  animalType: AnimalType;
  race: string;
  price: number;
  description: string;
  stock: number;
}
    
export type AnimalType = "Chien" | "Chat" | "Oiseau" | "Poisson" | "Rongeur" | "Reptile";