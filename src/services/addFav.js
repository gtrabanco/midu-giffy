import { API_ENDPOING } from "./getEndpoint";

export default function addFav({ id, jwt }) {
  const request = {
    body: JSON.stringify({jwt}),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(`${API_ENDPOING}/favs/${id}`, request)
    .then(
      (res) => {
        if (!res.ok) throw new Error("Invalid response");
        return res.json();
      },
      (reason) => {
        return null;
      }
    )
    .then((res) => {
      const { jwt } = res.json();
      return jwt;
    })
}
