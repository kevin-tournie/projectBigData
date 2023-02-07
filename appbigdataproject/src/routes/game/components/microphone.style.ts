import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

interface ITimeLeftBarProps {
  time: number;
}

export const TimeLeftBar = styled.div<ITimeLeftBarProps>`
  height: 10px;
  width: 400px;
  animation: timeLeftBar ${({ time }) => time / 1000}s linear;
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

export const WrapperText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
