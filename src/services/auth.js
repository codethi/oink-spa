import axios from "axios";

const BASE_URL = "http://localhost:3333";

export function singup(body) {
  const response = axios.post(`${BASE_URL}/singup`, body);
  return response;
}

export function singin(body) {
  const response = axios.post(`${BASE_URL}/singin`, body);
  return response;
}

export async function getUserById(id, jwt) {
  const response = await axios
    .get(`${BASE_URL}/findById`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        return error.response;
      }
    });

  return response.data;
}
