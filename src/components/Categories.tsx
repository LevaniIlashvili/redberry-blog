import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "./Category";
import { CategoryType } from "../types/types";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

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

  if (!categories.length) return null;

  return (
    <Wrapper>
      {categories.map((category) => {
        return <Category key={category.id} category={category} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 68.4rem;
  list-style: none;
  display: flex;
  gap: 2.4rem;
  max-width: 100%;
  overflow-x: auto;
`;

export default Categories;
