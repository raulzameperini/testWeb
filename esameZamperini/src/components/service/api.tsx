import axios from 'axios';
import { type RecipeSummary, type RecipeDetail } from '../pages/Spoonacular';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

const client = axios.create({
  baseURL: BASE_URL,
  params: { apiKey: API_KEY },
});

export const api = {
  // Implementa "Our Search Process" 
  searchRecipes: async (query: string): Promise<RecipeSummary[]> => {
    const response = await client.get('/complexSearch', {
      params: {
        query,
        number: 12,
        addRecipeInformation: true, // Per avere subito immagini e titoli corretti
      },
    });
    return response.data.results;
  },

  // Implementa "What's in my fridge?" 
  findByIngredients: async (ingredients: string[]): Promise<RecipeSummary[]> => {
    const response = await client.get('/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 10,
        ranking: 1, // Prioritizza l'uso degli ingredienti che hai
      },
    });
    return response.data;
  },

  // Ottiene info nutrizionali  e costi 
  getRecipeDetail: async (id: number): Promise<RecipeDetail> => {
    const response = await client.get(`/${id}/information`, {
      params: {
        includeNutrition: true, 
      },
    });
    return response.data;
  },
};