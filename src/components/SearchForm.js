import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useGlobalContext } from '../context'

const SearchForm = () => {
  // access searchTerm value
  const { setSearchTerm } = useGlobalContext();
  // create useRef
  const searchValue = useRef();
  // handle side effect - focus input value on init load.
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  // handle search cocktail
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>
            search your favourite cocktail
          </label>
          <input type='text' id='name' ref={searchValue} onChange={searchCocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
