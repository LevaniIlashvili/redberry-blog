import styled from "styled-components";
import { BlogType } from "../types/types";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <Wrapper>
      <div className="image-container">
        <img className="blog-image" src={blog.image} alt={blog.title} />
      </div>
      <div className="text-container">
        <div>
          <h3 className="blog-author">{blog.author}</h3>
          <p className="blog-publish-date">{blog.publish_date}</p>
        </div>
        <h2 className="blog-title">{blog.title}</h2>
        <ul>
          {blog.categories.map((category) => {
            return (
              <li
                key={category.id}
                style={{
                  color: category.text_color,
                  backgroundColor: category.background_color,
                }}
              >
                {category.title}
              </li>
            );
          })}
        </ul>
        <p className="blog-description">{blog.description}</p>
        <Link to={`/blog/${blog.id}`}>
          სრულად ნახვა
          <img src="/see-more.svg" alt="see-more" width={20} height={20} />
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 40.8rem;

  .image-container {
    width: 40.8rem;
    height: 32.8rem;
    margin-bottom: 2.4rem;
  }

  .blog-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.2rem;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .blog-author {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    margin-bottom: 0.8rem;
  }

  .blog-publish-date {
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: var(--gray);
  }

  .blog-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: auto;
    height: 5.6rem;
  }

  .blog-description {
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: #404049;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  a {
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: var(--blue);
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    gap: 1.6rem;
  }

  li {
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    padding: 0.8rem 1.6rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
  }
`;

export default BlogCard;
