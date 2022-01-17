import { useEffect, useState, useRef } from 'react';

export default function useNearScreen({distance} = {distance: "100px"}) {
  const [isNearScreen, setNearScreen] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer

    const onObserved = (entries, observer) => {
      const el = entries && entries[0] ? entries[0] : {isIntersecting: false};
  
      if ( el.isIntersecting ) {
        setNearScreen(true);
        observer.disconnect();
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== "undefined" || import('intersection-observer')
    ).then(() => {
      if (fromRef && typeof fromRef.current === typeof Element) {
        observer = new IntersectionObserver(onObserved, {
          rootMargin: distance
        });

        observer.observe(fromRef.current);
      }
    }, [fromRef])

    return () => { observer && observer.disconnect()}
  })

  return {isNearScreen, fromRef};
}
