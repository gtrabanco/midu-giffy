import React, { useCallback } from "react";
import { useRoute, Link } from "wouter";

import useUser from "hooks/useUser";

import "./styles.css";

export default function Header() {
  const { isLogged, logout } = useUser();
  const [match] = useRoute("/login");

  const handleLogout = useCallback((event) => {
    event.preventDefault();
    logout();
  }, [logout]);

  const loginContent = !match ? <Link to="/login">Login</Link> : '';
  const content = isLogged ? (
      <button onClick={handleLogout}>Logout</button>
    ):
    loginContent;

  return (
    <header className="gf-header">
      {content}
    </header>
  );
}
