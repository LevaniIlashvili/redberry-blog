import styled from "styled-components";
import BlogCard from "./BlogCard";
import { useAppSelector } from "../app/hooks";

const BlogFeed = () => {
  const blogs = useAppSelector((state) => state.blogs.blogs);
  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategories
  );

  return (
    <Wrapper>
      {(selectedCategories.length
        ? blogs.filter((blog) =>
            blog.categories.some((category) =>
              selectedCategories.includes(category.title)
            )
          )
        : blogs
      ).map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  margin-top: 6.4rem;
  display: grid;
  grid-template-columns: repeat(3, 40.8rem);
  grid-gap: 3.2rem;
  justify-content: center;
`;

export default BlogFeed;
