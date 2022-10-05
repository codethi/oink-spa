import { useState, useContext } from "react";
import styled from "styled-components";
import { create } from "../../services/post";
import { RefreshContext } from "../../Contexts/RefreshContext";

export default function WritePost({ user, jwt }) {
  const [form, setForm] = useState({ text: "", image: "" });
  const { setRefresh } = useContext(RefreshContext);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    create(form, jwt).then((res) => {
      setForm({ text: "", image: "" });
      setRefresh(true);
    });
  }

  /* https://picsum.photos/1000/500 */

  return (
    <WriteContainer>
      <form>
        <textarea
          placeholder={`Diga ai, ${user.name}...`}
          name="text"
          type="text"
          row="50"
          value={form.text}
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></textarea>

        <input
          placeholder="Se tiver uma imagem, cole a URL aqui"
          name="image"
          type="text"
          value={form.image}
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></input>

        <div>
          <button onClick={handleSendForm}>Postar</button>
        </div>
      </form>
    </WriteContainer>
  );
}

const WriteContainer = styled.section`
  width: 100%;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.3rem;
  display: flex;
  justify-content: flex-end;

  img {
    width: 40px;
    border-radius: 50%;
    margin: 0 0.5rem;
    border: 2px solid #ff8787;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  input,
  textarea {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    resize: none;
    font-family: "Arial";

    :focus {
      border: 2px solid #ffb6b6;
    }
  }

  div {
    padding-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      outline: none;
      border: none;
      border-radius: 0.3rem;
      background-color: #ff8787;
      padding: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #fff;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.4s;

      :hover {
        background-color: #603434;
      }
    }
  }
`;
