import styled from "styled-components";
import { CategoryType } from "../types/types";
import { setSelectedCategories } from "../app/redux/categories/categories";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Category = ({ category }: { category: CategoryType }) => {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategories
  );
  const isSelected = selectedCategories.includes(category.title);

  return (
    <Wrapper
      style={{
        color: category.text_color,
        backgroundColor: category.background_color,
        border: `${isSelected ? "1px solid #000000" : "none"}`,
      }}
      onClick={() =>
        dispatch(
          setSelectedCategories(
            isSelected
              ? selectedCategories.filter(
                  (selectedCategory) => selectedCategory !== category.title
                )
              : [...selectedCategories, category.title]
          )
        )
      }
    >
      {category.title}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  padding: 0.8rem 1.6rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export default Category;
