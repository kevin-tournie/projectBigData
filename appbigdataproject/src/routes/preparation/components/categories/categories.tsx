import { Button } from "@mui/material";
import { useQuery } from "react-query";

import { Title, WrapperButton, WrapperCategories } from "./categories.style";

export const Categories = ({
  selectedCategoryId,
  setSelectedCategoryId,
}: any) => {
  const { data, isLoading, error } = useQuery("categories", () =>
    fetch("https://opentdb.com/api_category.php").then((data) => data.json())
  );

  if (isLoading) return <div>"Loading"</div>;

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
