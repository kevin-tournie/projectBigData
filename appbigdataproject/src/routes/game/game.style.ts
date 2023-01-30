import styled from "styled-components";

export const WrapperGame = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const WrapperCategory = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  background-image: linear-gradient(
    90deg,
    rgba(208, 205, 41, 1) 0%,
    rgba(200, 29, 30, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const WrapperOverflow = styled.div`
  display: flex;
  width: 600px;
  min-height: 50%;
  overflow-x: hidden;
  border-radius: 5px;
  box-shadow: 0px 5px 10px 5px rgba(133, 133, 133, 0.7);
`;

export const WrapperCard = styled.div`
  display: flex;
  width: 600px;
  max-width: 600px;
  gap: 100px;
  padding: 15px;
  flex-direction: column;
  justify-content: center;
`;

export const WrapperQuestion = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  min-width: 100%;
`;

export const WrapperAnswers = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  grid-row-gap: 20px;
`;

export const WrapperAnswer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface WrapperSliderProps {
  translation: any;
}

export const WrapperSlider = styled.div<WrapperSliderProps>`
  display: flex;
  flex-direction: row;
  min-width: 1000%;
  transition: all 0.7s ease-in-out 0s;
  ${(props) => `transform: translateX(${props.translation}%)`}
`;

export const WrapperPostGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  gap: 100px;
`;

export const WrapperScore = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  background-image: linear-gradient(
    90deg,
    rgba(208, 205, 41, 1) 0%,
    rgba(200, 29, 30, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const WrapperQuizProgress = styled.div`
  display: inline-block;
  background-image: linear-gradient(
    90deg,
    rgba(208, 205, 41, 1) 0%,
    rgba(200, 29, 30, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 15px;
`;
