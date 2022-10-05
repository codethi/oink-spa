import axios from "axios";

const BASE_URL = "http://localhost:3333";


export function create(body, jwt) {
  const response = axios
    .post(`${BASE_URL}/post`, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return response;
}

export function findAll(jwt) {
  const response = axios
    .get(`${BASE_URL}/post`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return response;
}
