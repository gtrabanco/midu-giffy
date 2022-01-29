import React, { useCallback, useEffect } from "react";
import { useRoute, Link } from "wouter";

import useUser from "hooks/useUser";

import "./styles.css";

export default function Header() {
  const { isLogged, logout } = useUser();
  const [matchLogin] = useRoute("/login");
  const [matchRegister] = useRoute("/register");

  const handleLogout = useCallback((event) => {
    event.preventDefault();
    logout();
  }, [logout]);

  useEffect(() => {
    if ((matchLogin || matchRegister) && isLogged) {
      window.history.back()
    }
  }, [isLogged ,matchLogin, matchRegister])

  const content = function ({isLogged, matchLogin, matchRegister}) {
    return (
      <>
        { isLogged ? <button onClick={handleLogout}>Logout</button> : ''}
        {! matchLogin && !isLogged ? <Link to='/login'>Login</Link> : ''}
        {((! matchRegister && !isLogged) ? <Link to='/register'>Register</Link> : '')}
      </>
    )
  } ({isLogged, matchLogin, matchRegister});

  return (
    <header className="gf-header">
      {content}
    </header>
  );
}
