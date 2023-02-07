import styled from "styled-components";

export const WrapperGlobal = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const WrapperTable = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 30px;
  padding: 15px 15px;
  background-color: rgb(60, 118, 210);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;

export const WrapperTableHeaders = styled.div`
  display: flex;
  font-size: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

interface WrapperTableRowsProps {
  isEmpty: boolean;
}

export const WrapperTableRows = styled.div<WrapperTableRowsProps>`
  display: flex;
  min-height: 500px;
  flex-direction: column;
  gap: 10px;
  align-items: ${(props) => (props.isEmpty ? "center" : "flex-start")};
`;

export const WrapperTableRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

export const WrapperCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

export const WrapperTableAndChart = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const WrapperRadarAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
