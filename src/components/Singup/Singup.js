import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconOink from "../../images/iconoink.png";
import { singup } from "../../services/auth";

export default function Singup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    singup(form).then((res) => {
      navigate("/singin");
    });
  }

  return (
    <SingContainer>
      <Image src={IconOink} alt="Logo Oink" />
      <Form autoComplete="off">
        <Title>Cadastro</Title>
        <Input
          placeholder="Digite seu nome"
          name="name"
          type="text"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>
        <Input
          placeholder="Link da sua foto"
          name="avatar"
          type="text"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>
        <Input
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>
        <Input
          placeholder="Digite sua senha"
          name="password"
          type="password"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>

        <Button onClick={handleSendForm}>Cadastrar</Button>
      </Form>
    </SingContainer>
  );
}

export const SingContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffb6b6;
  position: relative;
`;

export const Image = styled.img`
  width: 100px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 500px;
  height: 350px;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: #00000040 0px 2px 16px 0px, #00000040 0px 2px 16px 0px;
  background-color: #fff;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ff8787;
  padding-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 0.3rem;

  :focus {
    border: 2px solid #ffb6b6;
  }
`;

export const Button = styled.button`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 0.3rem;
  background-color: #ff8787;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
`;
