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
