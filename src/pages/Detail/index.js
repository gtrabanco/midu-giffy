import React from 'react'
import Gif from 'components/Gif'
import useSingleGif from 'hooks/useSingleGif'
import Spinner from 'components/Spinner/index'
import { Redirect } from '../../../node_modules/wouter/index'
// import {useTitle} from 'hooks/useSeo'
import { Helmet } from 'react-helmet-async'

export default function Detail ({ params }) {
  const {id} = params
  const {gif, isLoading, isError} = useSingleGif({id})

  // useTitle({
  //   title: gif?.title,
  //   description: `Viewing ${gif?.title ?? 'no'} gif`
  // })

  if (isLoading || !gif) return(
    <>
      <Helmet>
        <title>Loading...</title>
        <meta name="description" content="" />
      </Helmet>
      <Spinner />
    </>
  );
  if (isError) return <Redirect to='/404' />;

  return <>
      <Helmet>
        <title>{`Giffy | ${gif?.title ?? 'Untitled'}`}</title>
        <meta name="description" content={`Viewing ${gif?.title ?? 'untitled'} gif`} />
        <link rel="canonical" href={`http://localhost:3000/gif/${gif?.id}`} />
      </Helmet>
      <h3 className="App-title">{gif.title}</h3>
      <Gif id={gif.id} title={gif.title} url={gif.url} />
    </>
}