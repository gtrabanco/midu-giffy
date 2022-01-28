import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import useUser from "hooks/useUser";

import "./Login.css";
import isFunction from "../../../node_modules/lodash/isFunction";

export default function Login({onLogin = null}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLogged, login, isLoading, isLogginError } = useUser({
    username,
    password,
  });

  useEffect(() => {
    if (isLogged === true) {
      navigate("/");
      isFunction(onLogin) && onLogin();
    };
  }, [isLogged, navigate, onLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`${username} ${password}`)
    try {
      login({ username, password });
    } catch (e) {
      console.log(e);
    }

    //navigate("/");
  };

  return (
    <>
      {isLoading && <strong>Checking credentials</strong>}

      {!isLoading && (
        <form onSubmit={handleSubmit} className="form">
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Username..."
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="pasword"
              placeholder="Type your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button>Login</button>
        </form>
      )}
      {isLogginError && <strong>Credentials are not valid</strong>}
    </>
  );
}
