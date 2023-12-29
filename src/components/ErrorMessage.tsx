import styled from "styled-components";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <Wrapper
      className="error-container"
      style={{ color: "var(--error-color)" }}
    >
      <img src="/error-icon.svg" alt="error icon" width={20} height={20} />
      <span>{error}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  font-size: 1.2rem;
  line-height: 2rem;
  margin-top: 0.8rem;
`;

export default ErrorMessage;
