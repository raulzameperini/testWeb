import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { type RecipeSummary, type RecipeDetail } from '../pages/Spoonacular';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

const client = axios.create({
  baseURL: BASE_URL,
  params: { apiKey: API_KEY },
});



 
/*
 *API CALLS CON ASYNC/AWAIT E GESTIONE ERRORI
 * Cerca ricette per query
 * Metodologia: async/await con gestione errori
 */
export const searchRecipes = async (query: string): Promise<RecipeSummary[]> => {
  try {
    console.log("chiave api" + API_KEY);
    const response = await client.get('/complexSearch', {
      params: {
        query,
        number: 12,
        addRecipeInformation: true,
      },
    });
    return response.data.results;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'Errore durante la ricerca delle ricette';
    console.error('Errore in searchRecipes:', errorMessage);
    throw new Error(`Ricerca ricette fallita: ${errorMessage}`);
  }
};

// Trova ricette per ingredienti

export const findByIngredients = async (ingredients: string[]): Promise<RecipeSummary[]> => {
  try {
    const response = await client.get('/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 10,
        ranking: 1,
      },
    });
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      imageType: item.image?.split('.').pop() || '',
    }));
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'Errore durante la ricerca per ingredienti';
    console.error('Errore in findByIngredients:', errorMessage);
    throw new Error(`Ricerca per ingredienti fallita: ${errorMessage}`);
  }
};


 //Ottiene dettagli della ricetta con info nutrizionali

 
export const getRecipeDetail = async (id: number): Promise<RecipeDetail> => {
  try {
    const response = await client.get(`/${id}/information`, {
      params: {
        includeNutrition: true,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'Errore durante il caricamento dei dettagli della ricetta';
    console.error('Errore in getRecipeDetail:', errorMessage);
    throw new Error(`Caricamento dettagli fallito: ${errorMessage}`);
  }
};



/**
 * API CALL POST 
 * Salva una ricetta nei preferiti (POST)
 * 
 */
export const saveFavoriteRecipe = async (recipeId: number, userId: string): Promise<{ success: boolean; id?: string }> => {
  try {
    const response = await client.post('/favorites', {
      recipeId,
      userId,
      savedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'Errore durante il salvataggio della ricetta preferita';
    console.error('Errore in saveFavoriteRecipe:', errorMessage);
    throw new Error(`Salvataggio preferito fallito: ${errorMessage}`);
  }
};



/**
 * Hook React Query per cercare ricette
 * Metodologia: React Query con gestione automatica della cache
 */
export const useSearchRecipes = (query: string | null) => {
  return useQuery({
    queryKey: ['searchRecipes', query],
    queryFn: () => searchRecipes(query!),
    enabled: query !== null && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minuti
    retry: 2,
  });
};
 //Hook React Query per ricette per ingredienti
 
export const useFindByIngredients = (ingredients: string[] | null) => {
  return useQuery({
    queryKey: ['findByIngredients', ingredients],
    queryFn: () => findByIngredients(ingredients!),
    enabled: ingredients !== null && ingredients.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minuti
    retry: 2,
  });
};

 //Hook React Query per dettagli ricetta

export const useRecipeDetail = (recipeId: number | null) => {
  return useQuery({
    queryKey: ['recipeDetail', recipeId],
    queryFn: () => getRecipeDetail(recipeId!),
    enabled: recipeId !== null,
    staleTime: 10 * 60 * 1000, // 10 minuti
    retry: 2,
  });
};


/**
 * Hook React Query per salvare ricetta nei preferiti (POST)
 * Metodologia: React Query useMutation con gestione degli errori
 */
export const useSaveFavoriteRecipe = () => {
  return useMutation({
    mutationFn: ({ recipeId, userId }: { recipeId: number; userId: string }) =>
      saveFavoriteRecipe(recipeId, userId),
    onError: (error: Error) => {
      console.error('Errore nel salvataggio della ricetta preferita:', error.message);
    },
    onSuccess: () => {
      console.log('Ricetta preferita salvata con successo');
    },
  });
};


// LEGACY API OBJECT 


export const api = {
  searchRecipes,
  findByIngredients,
  getRecipeDetail,
  saveFavoriteRecipe,
};