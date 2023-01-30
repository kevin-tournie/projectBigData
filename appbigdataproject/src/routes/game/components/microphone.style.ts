import styled from "styled-components";

export const WrapperMicrophone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: 0px 2px 10px 5px rgba(133, 133, 133, 0.7);
  transition: all 200ms ease;

  :hover {
    transition: all 200ms ease;
    cursor: pointer;
    filter: brightness(10%);
  }
`;

export const TimeLeftBar = styled.div`
  height: 10px;
  width: 100%;
  animation: timeLeftBar 5s linear;
  background-color: #72b8ed;
  margin-bottom: 5px;
  @keyframes timeLeftBar {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
