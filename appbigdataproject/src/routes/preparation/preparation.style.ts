import styled from "styled-components";

export const WrapperSections = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
`;

export const WrapperStart = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 33%;
  align-items: center;
`;

interface WrapperTextProps {
  enable: boolean;
}

export const WrapperText = styled.div<WrapperTextProps>`
  font-size: 70px;
  border: 1px solid darkblue;
  border-radius: 5px;
  padding: 10px;
  ${(props) =>
    props.enable
      ? `background-image: linear-gradient(
    90deg,
    rgba(208, 205, 41, 1) 0%,
    rgba(200, 29, 30, 1) 100%
  );
  
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;`
      : `opacity: 0.5;`}
`;
