import { useContext, useEffect, useState } from "react";
import getGifs from "services/getGifs";
import GifsContext from "context/GifsContext";
import { RATINGS } from "services/getGifs";

const INITIAL_PAGE = 0;

//keyword: null, pageResults: 10, rating: RATINGS[0]

export function useGifs({
  keyword = null,
  pageResults = 10,
  rating = RATINGS[0],
} = {}) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);

  // recuperamos la keyword del localStorage
  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || "random";

  useEffect(
    function () {
      setLoading(true);

      getGifs({ keyword: keywordToUse, rating }).then((gifs) => {
        setGifs(gifs);
        setLoading(false);
        // guardamos la keyword en el localStorage
        localStorage.setItem("lastKeyword", keyword);
        localStorage.setItem("lastRating", rating);
      });
    },
    [keyword, keywordToUse, rating, setGifs]
  );

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return;

      setLoadingNextPage(true);

      getGifs({
        keyword: keywordToUse,
        page,
        rating,
      }).then((nextGifs) => {
        setGifs((prevGifs) => prevGifs.concat(nextGifs));
        setLoadingNextPage(false);
      });
    },
    [keywordToUse, rating, setGifs, page]
  );

  return { loading, loadingNextPage, gifs, setPage, page };
}
