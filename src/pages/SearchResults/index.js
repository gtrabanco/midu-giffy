//Npm
import React,{ useCallback, useEffect, useRef } from 'react'
//Services
//Hooks
import {useGifs} from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
//Components
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import LazyTrendingSearches from 'components/TrendingSearches'
//import debounce from 'lib/debounce'
import throttle from 'lib/throttle'

export default function SearchResults ({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  });

  //const handleNextPage = () => setPage(prevPage => prevPage + 1);
  // const debounceHandleNextPage = useCallback(
  //   () => debounce(setPage(prevPage => prevPage + 1), 300),
  //   [setPage]
  // );
  const throttleHandleNextPage = useCallback(
    () => throttle(setPage(prevPage => prevPage + 1), 200),
    [setPage]
  );

  useEffect(() => {
    if (isNearScreen) {
      throttleHandleNextPage();
    }
  }, [isNearScreen, throttleHandleNextPage])

  return <>
    {loading
      ? <Spinner />
      : <>
        <h3 className="App-title">
          {decodeURI(keyword)}
        </h3>
        <ListOfGifs gifs={gifs} />
        <div id="viewer" ref={externalRef}></div>
        <div className="App-category">
          <LazyTrendingSearches />
        </div>
      </>
    }
  </>
}
