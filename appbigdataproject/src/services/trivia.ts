import { maxQuestions } from "../libs/const";
import { shuffleArray } from "../libs/utils";

type PreProcessedQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type TriviaAPIResponseStructure = {
  response_code: number;
  results: PreProcessedQuestion[];
};

export type PostProcessedQuestion = PreProcessedQuestion & {
  shuffledAnswers: string[];
};

export type TriviaAPICategoryResponseStructure = {
  trivia_categories: {
    id: number;
    name: string;
  }[];
};

export const fetchQuestionsAnswers = async (
  selectedCategoryId: number,
  selectedDifficulty: string
) => {
  try {
    const questions = await fetch(
      `https://opentdb.com/api.php?amount=${maxQuestions}&category=${selectedCategoryId}&difficulty=${
        selectedDifficulty.toLowerCase() === "super easy"
          ? "easy"
          : selectedDifficulty.toLowerCase()
      }&type=${
        selectedDifficulty.toLowerCase() === "super easy"
          ? "boolean"
          : "multiple"
      }`
    );

    const questionsJSON: TriviaAPIResponseStructure = await questions.json();

    const processedQuestions: PostProcessedQuestion[] = questionsJSON.results
      .map((question) => {
        return {
          ...question,
          shuffledAnswers: shuffleArray([
            question.correct_answer,
            ...question.incorrect_answers,
          ]),
        };
      })
      .map((question) => {
        return {
          ...question,
          shuffledAnswers: question.shuffledAnswers.map((answer, index) => {
            if (question.type === "boolean") {
              return answer === "True" ? "Yes" : "No";
            } else {
              return `${index + 1} )${answer
                .replaceAll(/&quot;/g, '"')
                .replaceAll(/&#039;/g, "'")}`;
            }
          }),
        };
      });

    return processedQuestions;
  } catch (error) {
    throw new Error("Error fetching questions");
  }
};

export const fetchAllCategories = async () => {
  const categories = await fetch("https://opentdb.com/api_category.php");

  if (!categories.ok) throw new Error("Error fetching categories");

  return await categories.json();
};
