import { useEffect, useRef } from "react"

export function useTitle({title = "Looking for gifs", description}) {
  const prevTitle = useRef(document.title);
  const prevDesc = useRef(document.querySelector('meta[name="description"]'));

  useEffect(() => {
    const previousTitle = prevTitle.current;
    if(title) {
      document.title = `Giffy | ${title}`
    }

    return () => document.title = previousTitle;
  }, [title])

  useEffect(() => {
    const previousDesc = prevDesc.current;
    const metaDesc = document.querySelector('meta[name="description"]');

    console.log(metaDesc)

    if (description?.length > 0) {
      metaDesc.setAttribute('content', description)
    }

    return () => metaDesc.setAttribute('content', previousDesc.content);
  }, [description])
}