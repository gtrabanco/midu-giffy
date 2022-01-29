import React, { useCallback, useState } from "react";

import Modal from "components/modal";
import useUser from "hooks/useUser";

import "./Fav.css";
import Login from "components/Login/index";

export default function Fav(id) {
  const { isLogged, addFav, favs } = useUser();
  const [showModal, setShowModal] = useState(false);

  const isFaved = favs.some((favId) => favId === id);

  const handleLogin = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleClick = () => {
    if (!isLogged) {
      return setShowModal(true);
    }
    addFav({ id });
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const removeFavArr = ["Remove Gif from favorites", "❌"];
  const addFavArr = ["Add Gif to favorites", "❤️"];
  const [label, emoji] = isFaved ? removeFavArr : addFavArr;

  return (
    <>
      {showModal ? (
        <Modal onClose={handleCloseModal}>
          <Login onLogin={handleLogin} />
        </Modal>
      ) : (
        ""
      )}
      <button className="gf-Fav" onClick={handleClick}>
        <span aria-label={label} role="img">
          {emoji}
        </span>
      </button>
    </>
  );
}
