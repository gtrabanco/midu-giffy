import { API_ENDPOING } from "./getEndpoint";

export default function getFavs({ jwt }) {
  const request = {
    body: JSON.stringify({ jwt }),
    method: "GET",
    headers: {
      "Authorization": jwt,
      "Content-type": "application/json",
    },
  };

  return fetch(`${API_ENDPOING}/favs`, request)
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
      const { favs } = res ?? {favs: []};
      return favs;
    });
}
