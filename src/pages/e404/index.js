import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function e404() {
  return (
    <>
      <Helmet>
        <title>Giffy | Error 404: Page not found</title>
      </Helmet>
      <h1>404</h1>
    </>
  )
}
