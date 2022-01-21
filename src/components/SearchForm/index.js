import React from "react"
import { useLocation } from "wouter"
import { RATINGS } from 'services/getGifs';
import { useSearchForm } from 'hooks/useSearchForm'

function SearchForm({initialKeyword = '', initialRating = RATINGS[0]}) {
  const {keyword, rating, times, updateKeyword, updateRating } = useSearchForm({initialKeyword, initialRating})

  const [, pushLocation] = useLocation()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    pushLocation(`/search/${keyword}/${rating}`);
  }

  const handleUpdateKeyword = event => updateKeyword(event.target?.value);
  const handleUpdateRating  = event => updateRating(event.target.value);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button>Buscar</button>
        <input placeholder="Search a gif here..." onChange={handleUpdateKeyword} type='text' value={keyword} />
        <select onChange={handleUpdateRating} value={rating}>
          <option disabled>Rating type</option>
          {RATINGS.map(rating => <option key={rating}>{rating.toUpperCase()}</option>)}
        </select>
      </form>
      <small>{times}</small>
    </>
  )
}

export default React.memo(SearchForm)
