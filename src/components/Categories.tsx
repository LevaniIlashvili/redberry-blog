import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "./Category";
import { CategoryType } from "../types/types";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://api.blog.redberryinternship.ge/api/categories"
        );
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  console.log(categories);

  if (!categories.length) return null;

  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <Category
            key={category.id}
            category={category}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  margin-top: 40.8rem;
  width: 90%;
  list-style: none;
  display: flex;
  gap: 2.4rem;
  max-width: 100%;
  overflow-x: auto;
`;

export default Categories;
