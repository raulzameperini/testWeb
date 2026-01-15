// Interfaccia base per una ricetta 
export interface RecipeSummary {
    id: number;
    title: string;
    image: string;
    imageType: string;
  }
  
  // Interfaccia per i dettagli completi 
  export interface RecipeDetail extends RecipeSummary {
    servings: number;
    readyInMinutes: number;
    sourceUrl: string;
    aggregateLikes: number;
    pricePerServing: number; // 
    extendedIngredients: Ingredient[];
    nutrition?: Nutrition;   // 
  }
  
  export interface Ingredient {
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string; // Es: "1 cup oats" [cite: 61]
  }
  
  export interface Nutrition {
    nutrients: Nutrient[];
  }
  
  export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number; // Es: Calories 16% [cite: 74]
  }