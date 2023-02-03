import styled from "styled-components";

export const TimeLeftBar = styled.div`
  height: 10px;
  width: 400px;
  animation: timeLeftBar 3s linear;
  background-color: #72b8ed;
  margin-bottom: 5px;
  @keyframes timeLeftBar {
    0% {
      width: 400px;
    }
    100% {
      width: 0px;
    }
  }
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
