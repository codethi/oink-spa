import styled from "styled-components";
import { ImgAvatar } from "../CardPost/CardPost";
import ImageDefault from "../../images/iconoink.png";
import { useContext, useState } from "react";
import { commentPost, deleteCommentPost } from "../../services/post";
import { RefreshContext } from "../../Contexts/RefreshContext";
import { LoadContext } from "../../Contexts/LoadContext";
import Load from "../Load/Load";

export default function CardComment({ post, showCommnet, user, jwt }) {
  const [comment, setComment] = useState("");

  const { refresh, setRefresh } = useContext(RefreshContext);

  const { isLoading, setIsLoading } = useContext(LoadContext);

  async function handleSendComment(e) {
    e.preventDefault();
    setIsLoading(true);
    const newComment = { message: comment };
    await commentPost(post.id, newComment, jwt);
    setComment("");
    setIsLoading(false);
    setRefresh(!refresh);
  }

  async function handleDeleteComment(idPost, idComment) {
    setIsLoading(true);
    await deleteCommentPost(idPost, idComment, jwt);
    setIsLoading(false);
    setRefresh(!refresh);
  }

  if (isLoading) {
    return <Load />;
  }

  return (
    <CommentContainer>
      {showCommnet ? (
        <>
          <form>
            <ImgAvatar
              src={!user.avatar ? ImageDefault : user.avatar}
              alt="User Avatar"
            />
            <input
              type="text"
              name="text"
              value={comment}
              placeholder="Comente sobre esse post..."
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleSendComment}>Comentar</button>
          </form>

          <ListComments>
            {post.comments.map((item, index) => (
              <article key={index}>
                <div>
                  <ImgAvatar
                    src={!item.user.avatar ? ImageDefault : item.user.avatar}
                    alt="User Avatar"
                  />
                  <span>{item.message}</span>
                </div>

                {post.loggedUser === item.user._id ? (
                  <ion-icon
                    onClick={() => handleDeleteComment(post.id, item.idComment)}
                    name="close-circle-outline"
                  ></ion-icon>
                ) : (
                  ""
                )}
              </article>
            ))}
          </ListComments>
        </>
      ) : (
        ""
      )}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  form {
    display: flex;
    align-items: center;

    input {
      width: 100%;
      font-size: 1rem;
      padding: 0.5rem;
      outline: none;
      border: 1px solid #ccc;
      border-right: 0;
      border-radius: 0.3rem 0 0 0.3rem;

      :focus {
        border: 2px solid #ffb6b6;
      }
    }

    button {
      outline: none;
      border: none;
      border-radius: 0 0.3rem 0.3rem 0;
      background-color: #ff8787;
      padding: 0.65rem 0;
      font-size: 0.8rem;
      font-weight: 600;
      color: #fff;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.4s;
      width: 140px;

      :hover {
        background-color: #603434;
      }
    }
  }
`;

const ListComments = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fdecec;
    padding: 1rem;
    border-radius: 0.5rem;

    div {
      width: 100%;
      display: flex;
      align-items: center;

      p {
        font-size: 1rem;
      }
    }

    ion-icon {
      color: #f62700;
      font-size: 1.5rem;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        color: #820011;
        transform: scale(1.1);
      }
    }
  }
`;
