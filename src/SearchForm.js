import React from 'react'
import { useGlobalContext } from './context'
import { CiSearch } from "react-icons/ci";
import book from './images/book.png'

const SearchForm = () => {
  const { query, updateSearch, getWord } = useGlobalContext();

  return (
    <div className='header'>
      <div className='search-bar container'>
        <img src={book} alt="dictionary" />
        <h1>Dictionary App</h1>

        <form onSubmit={getWord} className="submit-field">
          <input
            onChange={updateSearch}
            value={query}
            className="search-bar__input"
            type="search"
            required
            placeholder="enter a word"
            aria-label="search" />
          <button
            id="submit"
            className="search-bar__submit"
            type="submit">
            <CiSearch />
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
