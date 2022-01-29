import { API_ENDPOING } from "./getEndpoint";

export default function login({ username, password }) {
  const request = {
    body: JSON.stringify({ username, password }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(`${API_ENDPOING}/login`, request)
    .then(
      async (res) => {
        if (!Boolean(res.ok)) throw new Error("Invalid response");
        return await res.json();
      },
      (reason) => {
        return {};
      }
    )
    .then((res) => {
      const { jwt } = res;
      return jwt;
    });
}
