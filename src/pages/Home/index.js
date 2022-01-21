import React from "react"

import {useGifs} from 'hooks/useGifs'

import ListOfGifs from 'components/ListOfGifs'
import LazyTrendingSearches from "components/TrendingSearches"
import SearchForm from "components/SearchForm/index"

import './style.css'
import { Helmet } from "react-helmet-async"

//const POPULAR_GIFS = ["Matrix", "Venezuela", "Chile", "Colombia", "Ecuador"]

export default function Home() {
  const {gifs} = useGifs()

  const initialKeyword = localStorage.getItem('lastKeyword') && localStorage.getItem('lastKeyword') !== 'null' ?
    localStorage.getItem('lastKeyword'):
    '';
  const initialRating = localStorage.getItem('lastRating') ?? 'G';

  return (
    <>
      <Helmet>
        <title>Giffy | Home</title>
      </Helmet>
      <SearchForm initialKeyword={initialKeyword} initialRating={initialRating} />
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
