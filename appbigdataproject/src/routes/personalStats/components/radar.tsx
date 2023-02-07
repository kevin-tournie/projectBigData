import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { categories, difficulties } from "../../../const";
import { WrapperDifficultyButtons, WrapperRadar } from "./radar.style";
import { Button } from "@mui/material";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const RadarScores = ({ userHistory }: any) => {
  const [selectedRadar, setSelectedRadar] = useState<string>("Super Easy");

  const allData = difficulties.map((difficulty) => {
    const filteredDataByDifficulty = userHistory.filter(
      (item: any) => item.difficulty === difficulty
    );
    return {
      labels: categories.map((category) => category.name),
      datasets: [
        {
          label: "Score",
          data: categories.map((category) => {
            const filteredDataByDifficultyAndCategory =
              filteredDataByDifficulty.filter(
                (item: any) => item.category_id === category.id
              );
            const totalScore = filteredDataByDifficultyAndCategory.reduce(
              (acc: number, curr: any) => acc + curr.score,
              0
            );
            const averageScore =
              totalScore / filteredDataByDifficultyAndCategory.length;
            return averageScore;
          }),
        },
      ],
    };
  });

  console.log(allData, selectedRadar, difficulties.indexOf(selectedRadar));

  const selectedRadarGraphData = allData[difficulties.indexOf(selectedRadar)];

  console.log(selectedRadarGraphData);

  return (
    <WrapperRadar>
      <Radar
        data={selectedRadarGraphData}
        options={{
          responsive: true,
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 10,
            },
          },
        }}
      />
      <WrapperDifficultyButtons>
        {difficulties.map((difficulty) => (
          <Button
            key={difficulty}
            variant={difficulty === selectedRadar ? "contained" : "outlined"}
            onClick={() => setSelectedRadar(difficulty)}
          >
            {difficulty}
          </Button>
        ))}
      </WrapperDifficultyButtons>
    </WrapperRadar>
  );
};
