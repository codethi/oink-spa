import { Button, Image, Input, SingContainer, Title } from "../Singup/Singup";

import IconOink from "../../images/iconoink.png";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { singin } from "../../services/auth";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Singin() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { setJwt } = useContext(AuthContext);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    singin(form).then((res) => {
      if (res.data.message) {
        return swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
          timer: "7000",
        });
      }
      setJwt(res.data.token);
      navigate("/");
    });
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
          Não tem uma conta? <Link className="link" to="/singup">Cadastre-se</Link>
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

    .link {
      color: #ff8787;
      font-weight: 600;
    }
  }
`;
