import styled from "styled-components";

export const WrapperTable = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  border-radius: 10px;
  gap: 30px;
  padding: 15px 0px;
  background-color: rgb(60, 118, 210);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  width: 55%;
`;

export const WrapperTableHeaders = styled.div`
  display: flex;
  font-size: 20px;
  flex-direction: row;
  justify-content: space-around;
  /* border: 1px solid black; */
`;

interface WrapperTableRowsProps {
  isEmpty: boolean;
}

export const WrapperTableRows = styled.div<WrapperTableRowsProps>`
  display: flex;
  min-height: 500px;
  flex-direction: row;
  justify-content: space-around;
  align-items: ${(props) => (props.isEmpty ? "center" : "flex-start")};
  /* border: 1px solid black; */
`;

export const WrapperCell = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
`;
