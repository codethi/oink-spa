import { Button, Image, Input, SingContainer, Title } from "../Singup/Singup";

import IconOink from "../../images/iconoink.png";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Singin.css";

export default function Singin() {
  const [form, setForm] = useState({});

  function handleForm({ value, name }) {
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <SingContainer>
      <Image src={IconOink} alt="Logo Oink" />
      <Form autoComplete="off">
        <Title>Entrar</Title>

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

        <Button onClick={handleSendForm}>Entrar</Button>

        <span>
          Não tem uma conta?{" "}
          <Link className="link" to="/singup">
            Cadastre-se
          </Link>
        </span>
      </Form>
    </SingContainer>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 400px;
  height: 300px;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: #00000040 0px 2px 16px 0px, #00000040 0px 2px 16px 0px;
  background-color: #fff;

  span {
    margin-top: 1rem;
  }
`;
