import styled from "styled-components";

export const WrapperGlobal = styled.div`
  display: flex;
  gap: 20px;

  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const WrapperTable = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 30px;
  padding: 20px 20px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  position: relative;
`;

export const WrapperTableHeaders = styled.div`
  display: flex;
  font-size: 20px;
  flex-direction: row;
  justify-content: space-around;
  padding-right: 10px;
`;

interface WrapperTableRowsProps {
  isEmpty: boolean;
}

export const WrapperTableRows = styled.div<WrapperTableRowsProps>`
  display: flex;
  min-height: 500px;
  max-height: 500px;
  flex-direction: column;
  gap: 10px;
  align-items: ${(props) => (props.isEmpty ? "center" : "flex-start")};
  overflow-y: scroll;
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
  text-align: center;
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

export const WrapperTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
