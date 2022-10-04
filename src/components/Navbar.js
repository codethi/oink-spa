import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconIonk from "../images/iconoink.png";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function handleExit() {
    localStorage.clear();
    navigate("/singin");
  }

  return (
    <Wrapper>
      <div>
        <Icon src={IconIonk} alt="Icone Oink" />
        Oink
      </div>

      <span>
        Olá, {user.name} <img src={user.avatar} alt="Avatar User" />
        <button onClick={handleExit}>Sair</button>
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ff8787;
  font-size: 34px;
  font-weight: 700;
  padding: 1rem;
  box-shadow: #00000030 0px 3px 8px;
  margin-bottom: 1rem;

  div {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 1.5rem;
    display: flex;
    align-items: center;

    img {
      width: 40px;
      border-radius: 50%;
      margin: 0 0.5rem;
      border: 2px solid #ff8787;
    }

    button {
      background-color: transparent;
      outline: none;
      border: 1px solid #ff8787;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;
      color: #ff8787;
      font-size: 1rem;
      font-weight: 700;
      transition: 0.3s;
      cursor: pointer;

      :hover {
        background-color: #ff8787;
        color: #fff;
      }
    }
  }
`;

const Icon = styled.img`
  width: 30px;
  margin-right: 0.5rem;
`;
