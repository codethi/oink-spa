import axios from "axios";

const BASE_URL = "http://localhost:3333";

export function singup(body) {
  const response = axios.post(`${BASE_URL}/singup`, body);
  return response;
}
