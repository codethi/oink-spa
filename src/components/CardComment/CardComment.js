import styled from "styled-components";
import { ImgAvatar } from "../CardPost/CardPost";
import ImageDefault from "../../images/iconoink.png";
import { useContext, useState } from "react";
import { commentPost } from "../../services/post";
import { RefreshContext } from "../../Contexts/RefreshContext";

export default function CardComment({ post, showCommnet, user, jwt }) {
  const [comment, setComment] = useState("");

  const { refresh, setRefresh } = useContext(RefreshContext);

  async function handleSendComment(e) {
    e.preventDefault();
    const newComment = { message: comment };
    await commentPost(post.id, newComment, jwt);
    setComment("");
    setRefresh(!refresh);
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

          <div>
            {post.comments.map((item, index) => (
              <article key={index}>
                <ImgAvatar
                  src={!item.userId.avatar ? ImageDefault : item.userId.avatar}
                  alt="User Avatar"
                />
                <p>{item.message}</p>
              </article>
            ))}
          </div>
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

  div {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    article {
      display: flex;
      align-items: center;
      background-color: #fdecec;
      padding: 1rem;
      border-radius: 0.5rem;

      p {
        font-size: 1rem;
      }
    }
  }
`;
