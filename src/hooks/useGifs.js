import {useContext, useEffect, useState} from 'react'
import getGifs from 'services/getGifs'
import GifsContext from 'context/GifsContext'

const INITIAL_PAGE = 0;

export function useGifs ({ keyword, pageResults } = { keyword: null, pageResults: 10 }) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const {gifs, setGifs} = useContext(GifsContext);

  // recuperamos la keyword del localStorage
  const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

  useEffect(function () {
    setLoading(true)

    getGifs({ keyword: keywordToUse })
      .then(gifs => {
        setGifs(gifs)
        setLoading(false)
        // guardamos la keyword en el localStorage
        localStorage.setItem('lastKeyword', keyword)
      })
  }, [keyword, keywordToUse, setGifs])

  useEffect(function () {
    if( page === INITIAL_PAGE || ! loading) return

    setLoadingNextPage(true);

    getGifs({
      keyword: keywordToUse,
      page
    })
      .then(nextGifs => {
        setGifs(prevGifs => prevGifs.concat(nextGifs));
        setLoadingNextPage(false);
      })
  }, [keywordToUse, setGifs, page, loading])

  return {loading, loadingNextPage, gifs, setPage}
}