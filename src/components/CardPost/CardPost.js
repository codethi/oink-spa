import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { likePost } from "../../services/post";
import { RefreshContext } from "../../Contexts/RefreshContext";

export default function CardPost({ post, jwt }) {
  let [date, time] = post.createdAt.split(" ");
  time = time.substring(0, 5);

  const [postLiked, setPostLiked] = useState(false);
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

  useEffect(() => {
    checkLikeFromThisUser();
  }, []);

  return (
    <CardPostContainer>
      <InfoContainer>
        <img src={post.userAvatar} alt="User Avatar" />
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
        <ion-icon
          onClick={handleLike}
          name={postLiked ? "heart" : "heart-outline"}
        ></ion-icon>
        <p>{post.likes.length}</p>
      </InteractionContainer>
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

  img {
    width: 40px;
    border-radius: 50%;
    margin: 0 0.5rem;
    border: 2px solid #ff8787;
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

  ion-icon {
    color: #ff8787;
    font-size: 1.5rem;
    cursor: pointer;
  }

  p{
    font-size: .9rem;
    color: #828282;
    padding-left: 0.2rem;
  }

`;
