import { useState } from 'react';
import axios from 'axios';

import { YOUR_API_URL } from '../constants/apis';
import { Cocktail } from './Cocktail';


const useCocktailService = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //la Api no tiene una lista completa de todos los tragos, por ende, tuve que llamar a la api
  // como si aplicara un buscador, e iterar de la letra a a la z.. de esta forma me logro mostrar
  // todos los tragos
  const getCocktails = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
        let allCocktails: Cocktail[] = [];

        for (let i = 97; i <= 122; i++) { // 97 = 'a', 122 = 'z'
        const letter = String.fromCharCode(i);
        const response = await axios.get(`${YOUR_API_URL}search.php?f=${letter}`);
        if (response.data.drinks) {
            allCocktails = allCocktails.concat(response.data.drinks);
        }
        }

        console.log('Todos los tragos:', allCocktails);
        return allCocktails;
    } catch (error) {
        console.error('Error fetching cocktails:', error);
        setErrorMessage('Ocurrió un error inesperado.');
        throw error;
    } finally {
        setIsLoading(false);
    }
  };

  const getOneCocktail = async (idDrink: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`${YOUR_API_URL}lookup.php`, {
        params: {
          i: idDrink,
        }
      });
      if (!response.data.drinks || response.data.drinks.length === 0) {
        return null; // no se encontro el trago
      }

    return response.data.drinks[0] as Cocktail; // objeto con url, breeds[], etc.
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setErrorMessage('Ocurrió un error inesperado.');
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  }

  return { getCocktails, getOneCocktail, isLoading, errorMessage };
}

export default useCocktailService;