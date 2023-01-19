import { Button } from "@mui/material";

import { Title, WrapperButton, WrapperCategories } from "./categories.style";

export const Categories = ({
  data,
  selectedCategoryId,
  setSelectedCategoryId,
}: any) => {
  return (
    <WrapperCategories>
      <Title>Select a category!</Title>
      {data.trivia_categories.map((category: any, index: number) => (
        <WrapperButton key={index}>
          <Button
            variant={
              selectedCategoryId === category.id ? "contained" : "outlined"
            }
            onClick={(e) => {
              e.preventDefault();
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
