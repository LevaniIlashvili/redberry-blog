import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { CategoryType } from "../types/types";
import BlogCard from "./BlogCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SimilarBlogs = ({ categories }: { categories: CategoryType[] }) => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(0);
  const blogs = useAppSelector((state) => state.blogs.blogs);

  if (!blogs.length) return null;

  return (
    <Wrapper>
      <div className="similar-blogs-header-container">
        <h2 className="similar-blogs-header"> მსგავსი სტატიები</h2>
        <div className="navigation">
          <button
            className="navigation-btn"
            type="button"
            onClick={() =>
              setCurrentPage((prev) => (prev === 0 ? prev : prev - 1))
            }
            style={{ backgroundColor: currentPage !== 0 ? "#5D37F3" : "" }}
          >
            <img src="/left-arrow-white.svg" alt="left-arrow" />
          </button>
          <button
            className="navigation-btn"
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                prev >= blogs.length / 3 - 1 ? prev : prev + 1
              )
            }
            style={{
              backgroundColor:
                currentPage !== blogs.length / 3 - 1 ? "#5D37F3" : "",
            }}
          >
            <img src="/right-arrow-white.svg" alt="right-arrow" />
          </button>
        </div>
      </div>
      <div className="blogs">
        {blogs
          .filter(
            (blog) =>
              blog.categories.some((category) =>
                categories
                  .map((category) => category.title)
                  .includes(category.title)
              ) && blog.id !== Number(id)
          )
          .slice(currentPage * 3, currentPage * 3 + 3)
          .map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 128.8rem;
  margin-bottom: 47.5rem;

  .similar-blogs-header-container {
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .similar-blogs-header {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4rem;
  }

  .navigation {
    display: flex;
    gap: 2.4rem;
  }

  .navigation-btn {
    border: none;
    outline: none;
    background-color: transparent;
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e4e3eb;
    cursor: pointer;
  }

  .blogs {
    display: flex;
    gap: 3.2rem;
  }
`;

export default SimilarBlogs;
