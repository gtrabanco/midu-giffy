//Packages
import { useEffect, useState } from "react";

//Services
import getSingleGif from 'services/getSingleGif';

//Hooks
import useGlobalGifs from "hooks/useGlobalGifs";

export default function useSingleGif({id}) {
  const gifs = useGlobalGifs();
  const gifFromCache = gifs.find( singleGif => singleGif.id === id)

  const [gif, setGif] = useState(gifFromCache);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!gif) {
      setIsLoading(true);
      getSingleGif({id})
        .then(gifData => {
          setGif(gifData);
          setIsLoading(false);
        })
        .catch(() => setIsError(true));
    }
  }, [setGif, gif, id])

  return {gif, isLoading, isError}
}