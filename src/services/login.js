import { API_ENDPOING } from "./getEndpoint";

export default function login({ username, password }) {
  // const request = {
  //   body: JSON.stringify({ username, password }),
  //   method: "POST",
  //   headers: {
  //     //Authorization: { jwt },
  //     "Content-type": "application/json",
  //   },
  // };
  const request = {
    body: JSON.stringify({ username, password }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(`${API_ENDPOING}/login`, request)
    .then(
      (res) => {
        if (!res.ok) throw new Error("Invalid response");
        return res.json();
      },
      (reason) => {
        return {};
      }
    )
    .then((res) => {
      const { jwt } = res.json();
      return jwt;
    });
}
