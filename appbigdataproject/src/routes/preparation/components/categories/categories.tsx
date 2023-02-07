import { Button } from "@mui/material";
import { TriviaAPICategoryResponseStructure } from "../../../../services/trivia";

import { Title, WrapperButton, WrapperCategories } from "./categories.style";

type CategoriesProps = {
  data: TriviaAPICategoryResponseStructure;
  selectedCategoryId: number;
  setSelectedCategoryId: (id: number) => void;
};

export const Categories = ({
  data,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoriesProps) => {
  return (
    <WrapperCategories>
      <Title>Select a category!</Title>
      {data.trivia_categories.map((category, index) => (
        <WrapperButton key={index}>
          <Button
            variant={
              selectedCategoryId === category.id ? "contained" : "outlined"
            }
            onClick={(e) => {
              e.preventDefault();
              console.log(category.id);
              setSelectedCategoryId(category.id);
            }}
          >
            {category.name}
          </Button>
        </WrapperButton>
      ))}
    </WrapperCategories>
  );
};
