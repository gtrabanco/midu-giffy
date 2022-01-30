import SearchForm from "components/SearchForm/index";
import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const gifsErrors = [
  "d2jjuAZzDSVLZ5kI",
  "Bp3dFfoqpCKFyXuSzP",
  "hv5AEBpH3ZyNoRnABG",
  "hLwSzlKN8Fi6I",
];

export default function e404() {
  const randomImage = () => {
    return `https://media.giphy.com/media/${
      gifsErrors[Math.floor(Math.random * gifsErrors.length) + 1]
    }/giphy.gif`;
  };

  return (
    <>
      <Helmet>
        <title>Giffy | Error 404: Page not found</title>
      </Helmet>
      <header className="o-header">
        <SearchForm />
      </header>
      <div className="App-wrapper">
        <div className="App-main page-error">
          <span className="code-error">404</span>
          <span className="msg-error">Just an error</span>
          <img className="gif-error" src={randomImage()} alt="alt-page-404" />
          <Link href="/" className="btn">
            Go to home
          </Link>
        </div>
      </div>
    </>
  );
}
