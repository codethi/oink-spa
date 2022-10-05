import styled from "styled-components";
import Navbar from "../Navbar";
import WritePost from "../WritePost/WritePost";
import CardPost from "../CardPost/CardPost";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { findAll } from "../../services/post";

export default function Home() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();

  async function getUser() {
    const res = await getUserById(null, jwt);
    if (res.message) {
      swal({
        title: "Error",
        text: "Token inválido, faça o login novamente!",
        icon: "error",
        timer: "7000",
      });
      localStorage.clear();
      setTimeout(() => {
        navigate("/singin");
      }, 1000);
    }
    setUser(res);
  }

  async function getAllPosts() {
    const res = await findAll(jwt);
    switch (res.status) {
      case 401:
        swal({
          title: "Error",
          text: res.data,
          icon: "error",
          timer: "7000",
        });
        break;
      case 500:
        swal({
          title: "Error",
          text: res.data,
          icon: "error",
          timer: "7000",
        });
        break;
      default:
        setPosts(res.data.result);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [refresh]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <HomeContainer>
      <Navbar user={user} />
      <section>
        <WritePost user={user} setRefresh={setRefresh} refresh={refresh} />
        {posts.map((post, index) => (
          <CardPost key={index} post={post} />
        ))}
      </section>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  height: 100%;
  width: 100%;
  background-color: #ffb6b6;

  section {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto 1rem auto;
  }
`;
