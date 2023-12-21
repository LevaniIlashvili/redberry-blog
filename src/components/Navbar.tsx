import { useState } from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import { useAppSelector } from "../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);

  return (
    <Wrapper
      style={{
        justifyContent: `${
          currentPath === "/add-blog" ? "center" : "space-between"
        }`,
      }}
    >
      <img
        src="src/assets/redberry-logo.svg"
        alt="logo"
        className="redberry-logo"
        width={150}
        height={24}
        onClick={() => navigate("/")}
      />
      {!isLoggedIn ? (
        <button onClick={() => setIsModalOpen((prev) => !prev)}>შესვლა</button>
      ) : (
        <>
          {currentPath !== "/add-blog" && (
            <button onClick={() => navigate("/add-blog")}>დაამატე ბლოგი</button>
          )}
        </>
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
  padding: 0 7.6rem;
  border-bottom: 1px solid #e4e3eb;

  .redberry-logo {
    cursor: pointer;
  }

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
