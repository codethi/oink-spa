import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NotFound from "../../images/404.png";

export default function PageNotFound() {
  const navigate = useNavigate();
  function handleGoBack() {
    console.log("oi");
    navigate("/");
  }
  return <Image src={NotFound} onClick={handleGoBack} />;
}

const Image = styled.img`
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
`;
