import { useEffect, useState } from "react";
import { BlogType } from "../types/types";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import SimilarBlogs from "../components/SimilarBlogs";

export const BlogPage = () => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://api.blog.redberryinternship.ge/api/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        console.log(res);
        setBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <section className="blog">
        <img src={blog.image} alt="blog-image" className="blog-image" />
        <div className="header">
          <div className="blog-info">
            <h4 className="blog-author">{blog.author}</h4>
            <span className="blog-publish-date">{blog.publish_date}</span>
            {blog.email && <span className="blog-email">•{blog.email}</span>}
          </div>
          <ul>
            {blog.categories.map((category) => (
              <li
                style={{
                  backgroundColor: category.background_color,
                  color: category.text_color,
                }}
                key={category.id}
              >
                {category.title}
              </li>
            ))}
          </ul>
          <h1 className="single-blog-title">{blog.title}</h1>
        </div>
        <p className="blog-description">{blog.description}</p>
      </section>
      <SimilarBlogs categories={blog.categories} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100%;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--page-background);

  .blog {
    max-width: 72rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 9.8rem;
  }

  .blog-image {
    margin-bottom: 4rem;
  }

  .header {
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .blog-author {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    margin-bottom: 0.8rem;
  }

  .blog-publish-date,
  .blog-email {
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: var(--gray);
  }

  .single-blog-title {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4rem;
  }

  .blog-description {
    color: #404049;
    line-height: 2.8rem;
  }

  ul {
    display: flex;
    gap: 1.6rem;
  }

  li {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    padding: 0.8rem 1.6rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
  }
`;
