import { API_ENDPOING } from "./getEndpoint";

export default function register({ username, password }) {
  const request = {
    body: JSON.stringify({ username, password }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(`${API_ENDPOING}/register`, request).then(
    (res) => {
      if (!Boolean(res.ok)) throw new Error("Invalid response");
      return true;
    },
    (reason) => {
      return false;
    }
  );
}
