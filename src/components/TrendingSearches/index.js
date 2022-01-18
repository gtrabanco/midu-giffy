import React, {Suspense} from "react";
import Spinner from "components/Spinner/index";
import useNearScreen from "hooks/useNearScreen";

const TrendingSearches = React.lazy(() => import("components/TrendingSearches/TrendingSearches"))

export default function LazyTrendingSearches() {
  const {isNearScreen, fromRef } = useNearScreen()

  return (
    <div ref={fromRef}>
      <Suspense fallback={<Spinner />}>
        {
          isNearScreen ?
            <TrendingSearches />:
            ""
        }
      </Suspense>
    </div>
  )
}
