import styled from "styled-components";

export default function CardPost({ post }) {
  let [date, time] = post.createdAt.split(" ");
  time = time.substring(0, 5);

  return (
    <CardPostContainer>
      <div>
        <img className="avatar" src={post.userAvatar} alt="User Avatar" />
        <span>
          {post.userName}
          <p>
            {time} - {date}
          </p>
        </span>
      </div>

      <div className="post-container">
        {post.text}
        {post.image ? <img src={post.image} alt="Post" /> : ""}
      </div>
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

  div {
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
  }

  div.post-container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5rem;
  }

  img {
    width: 100%;
    margin-top: 1rem;
  }

  img.avatar {
    width: 40px;
    border-radius: 50%;
    margin: 0 0.5rem;
    border: 2px solid #ff8787;
  }
`;
