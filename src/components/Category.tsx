import styled from "styled-components";
import { CategoryType } from "../types/types";

const Category = ({
  category,
  selectedCategories,
  setSelectedCategories,
}: {
  category: CategoryType;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const isSelected = selectedCategories.includes(category.title);

  return (
    <Wrapper
      style={{
        color: category.text_color,
        backgroundColor: category.background_color,
        border: `${isSelected ? "1px solid #000000" : "none"}`,
      }}
      onClick={() =>
        setSelectedCategories((prev) =>
          isSelected
            ? prev.filter((item) => item !== category.title)
            : [...prev, category.title]
        )
      }
    >
      {category.title}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  padding: 0.8rem 1.6rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
`;

export default Category;
