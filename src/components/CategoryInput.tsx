import { useEffect, useState } from "react";
import { CategoryType } from "../types/types";
import axios from "axios";
import styled from "styled-components";

const CategoryInput = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: CategoryType[];
  setSelectedCategories: (categories: CategoryType[]) => void;
}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  return (
    <Wrapper>
      <div
        className={`category-input ${dropdownOpen && "active"}`}
        style={{
          padding: selectedCategories.length ? "0.6rem" : "1.2rem 1.6rem",
          backgroundColor: dropdownOpen
            ? "#F7F7FF"
            : selectedCategories.length && !dropdownOpen
            ? "#F8FFF8"
            : "",
          borderColor:
            selectedCategories.length && !dropdownOpen
              ? "var(--success-color)"
              : "",
        }}
        onClick={() => {
          setDropdownOpen((prev) => !prev);
        }}
      >
        <div className="category-content">
          {!selectedCategories.length ? (
            <span>კატეგორია</span>
          ) : (
            <>
              {selectedCategories.map((selectedCategory) => {
                return (
                  <span
                    key={selectedCategory.id}
                    className="category"
                    style={{
                      backgroundColor: selectedCategory.background_color,
                      color: selectedCategory.text_color,
                    }}
                  >
                    {selectedCategory.title}
                    <img
                      src="src/assets/delete-category.svg"
                      width={16}
                      height={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategories(
                          [...selectedCategories].filter(
                            (category) => category.id !== selectedCategory.id
                          )
                        );
                      }}
                    />
                  </span>
                );
              })}
            </>
          )}
        </div>
        <button className="toggle-dropdown-btn" type="button">
          <img
            src="src/assets/arrow-down.svg"
            alt="arrow down"
            width={20}
            height={20}
          />
        </button>
      </div>
      {dropdownOpen && (
        <div className="category-list-container">
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category.id}
                className="category"
                style={{
                  backgroundColor: category.background_color,
                  color: category.text_color,
                }}
                onClick={() => {
                  if (
                    selectedCategories.find(
                      (selectedCategory) => selectedCategory.id === category.id
                    )
                  )
                    return;

                  setSelectedCategories([
                    ...selectedCategories,
                    { ...category },
                  ]);
                }}
              >
                {category.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 28.6rem;
  height: 4.4rem;
  position: relative;

  .category-input {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 1.2rem;
    border: 1px solid var(--light-gray);
    font-size: 1.4rem;
    line-height: 2rem;
    color: var(--gray);
    cursor: pointer;
  }

  .category-content {
    width: 24.8rem;
    display: flex;
    gap: 0.8rem;
    overflow: hidden;
  }

  .toggle-dropdown-btn {
    background-color: transparent;
    border: none;
    width: 3.4rem;
    cursor: pointer;
  }

  .category-input.active {
    border: 1.5px solid var(--blue);
  }

  .category-list-container {
    position: absolute;
    top: 4.6rem;
    width: 100%;
    padding: 1.6rem;
    background-color: var(--white);
    border-radius: 1.2rem;
    border: 1px solid var(--light-gray);
    box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.08);
  }

  .category-list {
    width: 24.5rem;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .category {
    display: flex;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    padding: 0.8rem 1.6rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  span.category {
    padding: 0.8rem 1.2rem;
    white-space: nowrap;
  }
`;

export default CategoryInput;
