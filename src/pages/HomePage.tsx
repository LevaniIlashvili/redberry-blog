import styled from "styled-components";
import Categories from "../components/Categories";

const HomePage = () => {
  return (
    <Wrapper>
      <h1>ბლოგი</h1>
      <img
        className="galaxy-logo"
        src="src/assets/galaxy-logo.svg"
        alt="galaxy logo"
        width={1024}
        height={355}
      />
      <Categories />
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

  h1 {
    width: 22.5rem;
    color: var(--black);
    font-size: 6.4rem;
    font-weight: 700;
    line-height: 7.2rem;
    position: absolute;
    left: 8.9rem;
    top: 20.9rem;
  }

  .galaxy-logo {
    width: 62.4rem;
    height: 20rem;
    position: absolute;
    right: 7.6rem;
    top: 14.4rem;
  }
`;

export default HomePage;
