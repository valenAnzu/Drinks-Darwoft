import { useState } from 'react';
import axios from 'axios';
import { YOUR_API_URL } from '../constants/apis';

export type Ingredient = {
  strIngredient1: string;
};


const useIngredientService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getIngredients = async (): Promise<Ingredient[]> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${YOUR_API_URL}list.php?i=list`);
      return response.data.drinks as Ingredient[];
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setErrorMessage('Ocurrió un error inesperado.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { getIngredients, isLoading, errorMessage };
};

export default useIngredientService;
