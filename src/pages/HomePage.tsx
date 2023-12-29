import styled from "styled-components";
import Categories from "../components/Categories";
import BlogFeed from "../components/BlogFeed";

const HomePage = () => {
  return (
    <Wrapper>
      <div className="hero">
        <h1>ბლოგი</h1>
        <img
          className="galaxy-logo"
          src="src/assets/galaxy-logo.svg"
          alt="galaxy logo"
          width={1024}
          height={355}
        />
      </div>
      <Categories />
      <BlogFeed />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background-color: var(--page-background);
  min-height: calc(100vh - 8rem);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32.8rem;

  h1 {
    width: 22.5rem;
    color: var(--black);
    font-size: 6.4rem;
    font-weight: 700;
    line-height: 7.2rem;
    position: absolute;
    left: 8.9rem;
    top: 12.8rem;
  }

  .galaxy-logo {
    width: 62.4rem;
    height: 20rem;
    position: absolute;
    right: 7.6rem;
    top: 6.4rem;
  }
`;

export default HomePage;
