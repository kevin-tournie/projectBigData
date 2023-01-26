export function shuffleArray(array: any) {
  return array.sort((a: any, b: any) => 0.5 - Math.random());
}

export function computeScore(questions: any, answers: any) {
  let score = 0;
  questions.forEach((question: any, index: number) => {
    if (question.correct_answer === answers[index]) {
      score += 1;
    }
  });
  return score;
}
