import styled from "styled-components";
import Navbar from "../Navbar";
import WritePost from "../WritePost/WritePost";
import CardPost from "../CardPost/CardPost";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState({});
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <HomeContainer>
      <Navbar user={user} />
      <section>
        <WritePost user={user} />
        <CardPost />
      </section>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  height: 100vh;
  width: 100%;
  background-color: #ffb6b6;

  section {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;
