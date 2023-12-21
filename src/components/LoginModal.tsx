import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../app/redux/user/user";

const LoginModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  useEffect(() => {
    if (!email) {
      setError("");
      return;
    }

    if (!email.endsWith("@redberry.ge")) {
      setError("ელ-ფოსტა უნდა ბოლოვდებოდეს @redberry.ge-ით");
    } else {
      setError("");
    }
  }, [email]);

  const handleSubmit = async () => {
    try {
      await axios.post("https://api.blog.redberryinternship.ge/api/login", {
        email,
      });
      dispatch(login());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 422) {
        setError("ელ-ფოსტა არ მოიძებნა");
      } else {
        setError("შეცდომა სერვერზე");
      }
    }
  };

  const hadnleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  return (
    <Wrapper>
      <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
      <section className="modal-content">
        {!loggedIn ? (
          <>
            <img
              src="src/assets/close-icon.svg"
              alt="x icon"
              width={24}
              height={24}
              className="close-icon"
              onClick={() => setIsModalOpen(false)}
            />
            <h3 className="header">შესვლა</h3>
            <div className="input-container">
              <label className="input-label" htmlFor="email">
                ელ-ფოსტა
              </label>
              <input
                className="email-input"
                type="email"
                id="email"
                placeholder="Example@redberry.ge"
                value={email}
                onChange={hadnleChange}
                required
                style={{
                  borderColor: error
                    ? "var(--error-color)"
                    : "var(--button-color-blue)",
                }}
              />
              {error && (
                <div
                  className="error-container"
                  style={{ color: "var(--error-color)" }}
                >
                  <img
                    src="src/assets/error-icon.svg"
                    alt="error icon"
                    width={20}
                    height={20}
                  />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <button onClick={() => handleSubmit()} className="btn">
              შესვლა
            </button>
          </>
        ) : (
          <>
            <div className="successful-login">
              <img src="src/assets/tick-circle.svg" />
              <h3>წარმატებული ავტორიზაცია</h3>
            </div>
            <button
              className="btn"
              onClick={() => {
                setIsModalOpen(false);
                navigate("/");
              }}
            >
              კარგი
            </button>
          </>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: var(--black);

  .overlay {
    width: 100%;
    height: 100%;
    background-color: #1a1a1f;
    opacity: 0.24;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .modal-content {
    width: 48rem;
    background-color: #ffffff;
    z-index: 2;
    border-radius: 1.2rem;
    padding: 4rem 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .close-icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
  }

  .header {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.2rem;
    margin-bottom: 2.4rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2.4rem;
  }

  .error-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.2rem;
    line-height: 2rem;
  }

  .input-label {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
  }

  .email-input {
    width: 43.2rem;
    height: 4.4rem;
    border-radius: 1.2rem;
    font-style: normal;
    font-family: inherit;
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 1.2rem 1.6rem;
    background-color: #f7f7f7;
    outline: none;
  }

  .btn {
    width: 100%;
    cursor: pointer;
  }

  .successful-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 4.8rem;
    margin-top: 2.4rem;
  }

  .successful-login h3 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.8rem;
  }
`;

export default LoginModal;
