import React, { useCallback } from "react"
import { useLocation } from "wouter"

import {useGifs} from 'hooks/useGifs'

import ListOfGifs from 'components/ListOfGifs'
import LazyTrendingSearches from "components/TrendingSearches"
import SearchForm from "components/SearchForm/index"

import './style.css'

//const POPULAR_GIFS = ["Matrix", "Venezuela", "Chile", "Colombia", "Ecuador"]

export default function Home() {
  const {gifs} = useGifs()
  const [, pushLocation] = useLocation()

  const handleSubmit = useCallback(({keyword}) => {
    pushLocation(`/search/${keyword}`);
  }, [pushLocation]);

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      <div className="App-main">
        <div className="App-results">
          <h3 className="App-title">Última búsqueda</h3>
          <ListOfGifs gifs={gifs} />
        </div>
        <div className="App-category">
          <LazyTrendingSearches />
        </div>
      </div>
    </>
  )
}
