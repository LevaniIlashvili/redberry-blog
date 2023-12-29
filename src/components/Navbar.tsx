import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Revert to the original overflow style when the modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup: Revert to the original overflow style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <Wrapper
      style={{
        justifyContent: `${
          currentPath === "/add-blog" ? "center" : "space-between"
        }`,
      }}
    >
      <img
        src="/redberry-logo.svg"
        alt="logo"
        className="redberry-logo"
        width={150}
        height={24}
        onClick={() => navigate("/")}
      />
      {!isLoggedIn ? (
        <button className="btn" onClick={() => setIsModalOpen((prev) => !prev)}>
          შესვლა
        </button>
      ) : (
        <>
          {currentPath !== "/add-blog" && (
            <button className="btn" onClick={() => navigate("/add-blog")}>
              დაამატე ბლოგი
            </button>
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
  border-bottom: 1px solid var(--light-gray);

  .redberry-logo {
    cursor: pointer;
  }
`;

export default Navbar;
