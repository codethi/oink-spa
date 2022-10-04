import styled from "styled-components";
import Navbar from "../Navbar";
import WritePost from "../WritePost/WritePost";

export default function Home() {
  return (
    <HomeContainer>
      <Navbar />
      <WritePost />
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  height: 100vh;
  width: 100%;
  background-color: #000;
`;
