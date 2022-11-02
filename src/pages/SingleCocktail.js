import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  // get id from router
  const { id } = useParams();
  // create loading and cocktail states
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  // fetch cocktail side effect based on id change.
  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          // destruct data
          const { strDrink: name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass,
            strInstructions: instructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 } = data.drinks[0];
          // setup ingredients array.
          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];
          // setup cocktail object explicitly with ES6 shorthand to represent key-value pairs.
          const newCocktail = { name, image, info, category, glass, instructions, ingredients };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      }
      catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail()
  }, [id]);

  // check loading status
  if (loading) {
    return <Loading />
  }

  // check cocktail exists
  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  }
  // destruct from cocktail
  const { name, image, category, info, glass, instructions, ingredients } = cocktail;

  return (
    <section className='section cocktail-section'>
      {/* back link */}
      <Link to='/' className='btn btn-primary'>back home</Link>
      {/* cocktail name */}
      <h2 className='section-title'>{name}</h2>
      {/* drink details */}
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name : </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category : </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info : </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass : </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions : </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients : </span>
            {
              ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null;
              })
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
