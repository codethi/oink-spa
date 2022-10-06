import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { commentPost, likePost } from "../../services/post";
import { RefreshContext } from "../../Contexts/RefreshContext";
import ImageDefault from "../../images/iconoink.png";

export default function CardPost({ post, jwt, user }) {
  let [date, time] = post.createdAt.split(" ");
  time = time.substring(0, 5);

  const [postLiked, setPostLiked] = useState(false);
  const [showCommnet, setShowCommnet] = useState(false);
  const [comment, setComment] = useState("");

  const { refresh, setRefresh } = useContext(RefreshContext);

  async function handleLike() {
    const resp = await likePost(post.id, jwt);
    if (resp.status === 200) {
      setPostLiked(resp.data);
      setRefresh(!refresh);
    }
  }

  function checkLikeFromThisUser() {
    post.likes.forEach((item) => {
      if (item.userId === post.loggedUser) {
        setPostLiked(true);
      }
    });
  }

  async function handleSendComment(e) {
    e.preventDefault();
    const newComment = { message: comment };
    await commentPost(post.id, newComment, jwt);
    setComment("");
    setRefresh(!refresh);
  }

  useEffect(() => {
    checkLikeFromThisUser();
  }, []);

  return (
    <CardPostContainer>
      <InfoContainer>
        <ImgAvatar
          src={!post.userAvatar ? ImageDefault : post.userAvatar}
          alt="User Avatar"
        />
        <span>
          {post.userName}
          <p>
            {time} - {date}
          </p>
        </span>
      </InfoContainer>

      <PostContainer>
        {post.text}
        {post.image ? <img src={post.image} alt="Post" /> : ""}
      </PostContainer>

      <InteractionContainer>
        <div>
          <ion-icon
            onClick={handleLike}
            name={postLiked ? "heart" : "heart-outline"}
          ></ion-icon>
          <p>{post.likes.length}</p>
        </div>

        <div>
          <ion-icon
            onClick={() => setShowCommnet(!showCommnet)}
            name="chatbubble-ellipses-outline"
          ></ion-icon>
          <p>{post.comments.length}</p>
        </div>
      </InteractionContainer>

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
              {post.comments.map((item) => (
                <article>
                  <ImgAvatar
                    src={
                      !item.userId.avatar ? ImageDefault : item.userId.avatar
                    }
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
    </CardPostContainer>
  );
}

const CardPostContainer = styled.article`
  background-color: #fff;
  padding: 1rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto 1rem auto;
  border-radius: 0.3rem;
  word-break: break-all;
  box-shadow: #00000035 0px 0px 0.25em;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  span {
    font-size: 1.4rem;
    font-weight: 700;
    p {
      color: #828282;
      font-size: 0.8rem;
      margin-top: 0.3rem;
      font-weight: 500;
    }
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0.5rem;

  img {
    width: 100%;
    margin-top: 1rem;
  }
`;

const InteractionContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  ion-icon {
    color: #ff8787;
    font-size: 1.5rem;
    cursor: pointer;
  }

  p {
    font-size: 0.9rem;
    color: #828282;
    padding-left: 0.2rem;
  }
`;

const ImgAvatar = styled.img`
  width: 40px;
  border-radius: 50%;
  margin: 0 0.5rem;
  border: 2px solid #ff8787;
  background-color: #ff8787;
`;

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

    p {
      font-size: 1rem;
    }

    article {
      display: flex;
      align-items: center;
      background-color: #ffdddd;
      padding: 1rem;
      border-radius: 0.5rem;
    }
  }
`;
