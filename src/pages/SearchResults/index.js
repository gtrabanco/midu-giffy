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
import { Helmet } from 'react-helmet-async'
// import {useTitle} from 'hooks/useSeo'

export default function SearchResults ({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  });

  // useTitle({
  //   title: `showing ${gifs.length} results of ${keyword}`,
  //   description: `Showing results for ${keyword} search`
  // })

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
    <Helmet>
      <title>{`Giffy | Showing ${gifs.length} results of ${keyword}`}</title>
      <meta name="description" content={`Showing results for ${keyword} search`} />
      <link rel="canonical" href={`http://localhost:3000/search/${keyword}`} />
    </Helmet>
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
