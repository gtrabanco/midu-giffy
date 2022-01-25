import React from "react";
import { Link } from "wouter";

import useUser from "hooks/useUser";

import "./styles.css";

export default function Header() {
  const { isLogged, logout } = useUser();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <header className="gf-header">
      {isLogged ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}
