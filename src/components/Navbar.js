import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconIonk from "../images/iconoink.png";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function handleExit() {
    localStorage.removeItem("token");

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
        <ion-icon onClick={handleExit} name="exit-outline"></ion-icon>
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

    ion-icon {
      background-color: transparent;
      outline: none;
      padding-left: 0.6rem;
      color: #ff8787;
      font-size: 2rem;
      font-weight: 700;
      transition: 0.3s;
      cursor: pointer;
      

      :hover {
        transform: scale(1.1);
      }
    }
  }
`;

const Icon = styled.img`
  width: 30px;
  margin-right: 0.5rem;
`;
