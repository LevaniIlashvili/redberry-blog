import { useState } from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import { useAppSelector } from "../app/hooks";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);

  return (
    <Wrapper>
      <img
        src="src/assets/redberry-logo.svg"
        alt="logo"
        width={150}
        height={24}
      />
      {!isLoggedIn ? (
        <button onClick={() => setIsModalOpen((prev) => !prev)}>შესვლა</button>
      ) : (
        <button>დაამატე ბლოგი</button>
      )}
      {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 8rem;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7.6rem;
  border-bottom: 1px solid #e4e3eb;

  button {
    background-color: var(--button-color-blue);
    color: var(--white);
    border-radius: 0.8rem;
    padding: 1rem 2rem;
    font-family: inherit;
    font-weight: 500;
    border: none;
    font-size: 1.4rem;
    line-height: 2rem;
    cursor: pointer;
  }
`;

export default Navbar;
