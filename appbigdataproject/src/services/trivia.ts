import { shuffleArray } from "./utils";

export const fetchQuestionsAnswers = async (location: any) => {
  const result = await fetch(
    "https://opentdb.com/api.php?amount=10&category=" +
      location.state.selectedCategoryId +
      "&difficulty=" +
      location.state.selectedDifficulty.toLowerCase() +
      "&type=multiple"
  )
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((question: any) => {
        question.shuffledAnswers = shuffleArray([
          question.correct_answer,
          ...question.incorrect_answers,
        ]);
      });
      return data;
    });
  return result;
};
