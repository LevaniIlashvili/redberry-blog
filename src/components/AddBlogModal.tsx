import styled from "styled-components";

const AddBlogModal = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Wrapper>
      <div className="overlay" onClick={handleClick}></div>
      <div className="modal-content">
        <button className="close-btn" onClick={handleClick}>
          <img
            src="/close-icon.svg"
            alt="x icon"
            width={24}
            height={24}
            className="close-icon"
          />
        </button>
        <img src="/tick-circle.svg" className="success-icon" />
        <h3 className="header">ჩანაწერი წარმატებით დაემატა</h3>
        <button className="btn" onClick={handleClick}>
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: var(--black);

  .overlay {
    width: 100%;
    height: 100%;
    background-color: var(--black);
    opacity: 0.24;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .modal-content {
    width: 48rem;
    background-color: var(--white);
    z-index: 2;
    border-radius: 1.2rem;
    padding: 4rem 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .close-btn {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
    padding: 0.8rem;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  .close-btn:hover {
    background-color: #f5f4f9;
  }

  .close-btn:active {
    background-color: #ebeaef;
  }

  .success-icon {
    margin-bottom: 1.6rem;
  }

  .header {
    font-size: 2rem !important;
    font-weight: 700;
    line-height: 2.8rem;
    margin-bottom: 4.8rem;
  }

  .btn {
    width: 100%;
  }
`;

export default AddBlogModal;
