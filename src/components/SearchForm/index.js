import React from "react"
import { useLocation } from "wouter"
import { RATINGS } from 'services/getGifs';
import { useSearchForm } from 'hooks/useSearchForm'

import css from './style.css'

function SearchForm({initialKeyword = '', initialRating = RATINGS[0]}) {
  const {keyword, rating, times, updateKeyword, updateRating } = useSearchForm({initialKeyword, initialRating})

  const [, pushLocation] = useLocation()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    pushLocation(`/search/${keyword}/${rating}`);
  }

  const handleUpdateKeyword = event => updateKeyword(event.target?.value);
  const handleUpdateRating  = event => updateRating(event.target?.value);

  return (
    <>
      <form onSubmit={handleSubmit} className={css["c-search"]}>
        <button>Buscar</button>
        <input
          className={css["c-search-input"]}
          placeholder="Search a gif here..."
          onChange={handleUpdateKeyword}
          type='text'
          value={keyword}
        />
        <select className={css["c-search-list"]} onChange={handleUpdateRating} value={rating}>
          <option disabled>Rating type</option>
          {RATINGS.map(rating => <option key={rating}>{rating.toUpperCase()}</option>)}
        </select>
      </form>
    </>
  )
}

export default React.memo(SearchForm)
