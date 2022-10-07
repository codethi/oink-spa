import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import CardPost from "../../components/CardPost/CardPost";
import Load from "../../components/Load/Load";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../Contexts/AuthContext";
import { LoadContext } from "../../Contexts/LoadContext";
import { getUserById } from "../../services/auth";
import { findPostByUser } from "../../services/post";
import { RefreshContext } from "../../Contexts/RefreshContext";

export default function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { refresh } = useContext(RefreshContext);
  const { jwt } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadContext);

  async function getUser() {
    setIsLoading(true);
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
    setIsLoading(false);
  }

  async function getPostsByUser() {
    setIsLoading(true);
    const res = await findPostByUser(id, jwt);
    setPosts(res.data.result);
    setIsLoading(false);
  }

  useEffect(() => {
    getUser();
    getPostsByUser();
  }, [refresh]);

  if (isLoading) {
    return <Load />;
  }

  return (
    <>
      <Navbar user={user} />
      <HeaderContainer>
        <h1>Minhas Postagens</h1>
      </HeaderContainer>
      {posts.map((post, index) => (
        <CardPost key={index} post={post} user={user} jwt={jwt} />
      ))}
    </>
  );
}

const HeaderContainer = styled.section`
  padding: 1rem;
  width: 80%;
  display: flex;
  margin: 0 auto 1rem auto;

  h1 {
    font-size: 3rem;
    color: #fff;
    font-weight: 700;
  }
`;
