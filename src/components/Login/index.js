import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import useUser from "hooks/useUser";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLogged, login, isLoading, isLogginError } = useUser({username, password});

  useEffect(() => {
    if (isLogged === true) navigate('/')
  }, [isLogged, navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`${username} ${password}`)
    try {
      login({username, password});
    } catch(e) {
      console.log(e)
    }
    
    //navigate("/");
  };

  return (
    <>
      <h2>Login Form</h2>
      {isLoading && <strong>Checking credentials</strong>}
      
      {!isLoading &&
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="username"
              placeholder="Username..."
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
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
      }
      { isLogginError && <strong>Credentials are not valid</strong>}
    </>
  );
}
