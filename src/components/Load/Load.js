import styled from "styled-components";

export default function Load() {
  return (
    <Loading>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Loading>
  );
}

const Loading = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow: hidden;

  background-color: #fff;
  z-index: 99999;

  dIV.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #ffb6b6;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.5s infinite;
    }

    div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.5s infinite;
    }

    div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.5s infinite;
    }

    div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.5s infinite;
    }
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }
`;