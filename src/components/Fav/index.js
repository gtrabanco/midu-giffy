import useUser from "hooks/useUser";
import React from "react";
import { useLocation } from "wouter";

import "./Fav.css";

export default function Fav(id) {
  const { isLogged, addFav, favs } = useUser();
  const [, navigate] = useLocation();

  const isFaved = favs.some(favId => favId === id)
  
  const handleClick = () => {
    if (!isLogged) return navigate("/login");
    addFav({id});
  };

  const removeFavArr = [
    'Remove Gif from favorites',
    '❌'
  ];
  const addFavArr = [
    'Add Gif to favorites',
    '❤️'
  ]
  const [ label, emoji ] = isFaved ? removeFavArr : addFavArr;

  return (
    <>
      <button className="gf-Fav" onClick={handleClick}>
        <span aria-label={label} role="img">
          {emoji}
        </span>
      </button>
    </>
  );
}
