import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const LoginModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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

  const hadnleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  return (
    <Wrapper>
      <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
      <section className="modal-content">
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
        <button className="login-btn">შესვლა</button>
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
    /* height: 27.2rem; */
    background-color: #ffffff;
    z-index: 2;
    border-radius: 1.2rem;
    padding: 4rem 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
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
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
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

  .login-btn {
    width: 100%;
    cursor: pointer;
  }
`;

export default LoginModal;
