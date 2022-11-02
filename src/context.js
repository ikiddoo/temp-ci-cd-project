import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // create states
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  // create fetch context with useCallback hook - only if searchTerm changes then we invoke fetchDrinks function. 
  // If searchTerm doesn’t change, don’t create it from scratch (which without useCallback, we will end up with inifinite loop).
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      console.log(data);
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          // destructure properties from each item object
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;
          // return as new object with key-value pairs that are easier to manage.
          return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass, };
        });
        // set cocktails state with updated array of objects
        setCocktails(newCocktails);
      }
      else {
        setCocktails([]);
      }
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm])

  // useEffect - fetch drinks based on searchTerm change and fetchDrinks change.
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks])

  return (
    // set context value - so that our components can access these state values.
    <AppContext.Provider value={{
      loading,
      searchTerm,
      cocktails,
      setSearchTerm
    }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
