import React, { Suspense } from 'react';
import { Link, Route } from "wouter"

import {GifsContextProvider} from 'context/GifsContext'
import Pepito from 'context/StaticContext'

import SearchResults from 'pages/SearchResults'
import Detail from 'pages/Detail'
import e404 from 'pages/e404';

import './App.css'
import { HelmetProvider } from 'react-helmet-async';

const HomePage = React.lazy(() => import('pages/Home'))

export default function App() {
  return (
  <HelmetProvider>
    <Pepito.Provider value={{name: 'midudev',
    suscribeteAlCanal: true}}>
        <div className="App">
          <section className="App-content">
            <Link to="/">
              <figure className="App-logo">
                <img alt='Giffy logo' src='/logo.png' />
              </figure>
            </Link>
            <GifsContextProvider>
              <Suspense fallback={null}>
                <Route
                  component={HomePage}
                  path="/"
                />
              </Suspense>
              <Route
                component={SearchResults}
                path="/search/:keyword"  />
              <Route
                component={Detail}
                path="/gif/:id"
              />
              <Route
                component={e404}
                path="/404"
              />
            </GifsContextProvider>
          </section>
        </div>
      </Pepito.Provider>
    </HelmetProvider>
  )
}
