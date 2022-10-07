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

export function likePost(id, jwt) {
  const response = axios
    .patch(
      `${BASE_URL}/post/like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export function commentPost(id, body, jwt) {
  const response = axios
    .patch(
      `${BASE_URL}/post/comment/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export function deleteCommentPost(idPost, idComment, jwt) {
  const response = axios
    .patch(
      `${BASE_URL}/post/comment/${idPost}/${idComment}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });

  return response;
}