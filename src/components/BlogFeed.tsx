import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";
import { BlogType } from "../types/types";

const BlogFeed = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://api.blog.redberryinternship.ge/api/blogs",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        console.log(res);
        setBlogs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Wrapper>
      {blogs.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  margin-top: 6.4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 40.8rem);
  grid-gap: 3.2rem;
  justify-content: center;
`;

export default BlogFeed;
