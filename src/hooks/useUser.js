import { useCallback, useContext, useState } from "react";
import UserContext from "context/UserContext";
import serviceLogin from "services/login";
import serviceAddFav from "services/addFav";

export default function useUser() {
  const { jwt, setJWT, setFavs, favs } = useContext(UserContext);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ username, password }) => {
      if (username.length === 0 && password.length === 0) return;
      setState({ loading: true, error: false });
      serviceLogin({ username, password })
        .then((jwt) => {
          setJWT(jwt);
          window.sessionStorage.setItem("jwt", jwt);
          setState({ loading: false, error: false });
        })
        .catch((err) => {
          window.sessionStorage.removeItem("jwt");
          setState({ loading: false, error: true });
          console.warn("Error: %s", err);
        });
    },
    [setJWT, setState]
  );

  const logout = useCallback(() => {
    setJWT(null);
    window.sessionStorage.removeItem("jwt");
  }, [setJWT]);

  const addFav = useCallback(
    (id) => {
      serviceAddFav({ id, jwt })
        .then((favs) => setFavs(favs))
        .catch((error) => console.log(error));
    },
    [jwt, setFavs]
  );

  const deleteFav = () => {}

  return {
    isLogged: Boolean(jwt),
    isLoading: state.loading,
    isLogginError: state.error,
    login,
    logout,
    addFav,
    deleteFav,
    favs,
  };
}
