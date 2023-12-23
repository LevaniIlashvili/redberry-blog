import styled from "styled-components";
import UploadImage from "../components/UploadImage";
import { useState } from "react";

const AddBlogPage = () => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <Wrapper>
      <img
        src="src/assets/arrow.svg"
        alt="arrow icon"
        className="arrow-icon"
        width={44}
        height={44}
      />
      <form>
        <h1 className="header">ბლოგის დამატება</h1>
        <span className="input-header">ატვირთეთ ფოტო</span>
        <UploadImage image={image} setImage={setImage} />
        <div className="author-and-title-container">
          <div>
            <span className="input-header">ავტორი *</span>
            <input type="text" placeholder="შეიყვანეთ ავტორი" />
            <ul className="validation-requirements">
              <li>მინიმუმ 4 სიმბოლო</li>
              <li>მინიმუმ ორი სიტყვა</li>
              <li>მხოლოდ ქართული სიმბოლოები</li>
            </ul>
          </div>
          <div>
            <span className="input-header">სათაური *</span>
            <input type="text" placeholder="შეიყვანეთ ავტორი" />
            <span className="validation-requirements">მინიმუმ 2 სიმბოლო</span>
          </div>
        </div>
        <div className="description-container">
          <span className="input-header">აღწერა *</span>
          <textarea placeholder="შეიყვანეთ აღწერა" />
          <span className="validation-requirements">მინიმუმ 2 სიმბოლო</span>
        </div>
        <div className="date-and-category-container">
          <div className="date-container">
            <span className="input-header">გამოქვეყნების თარიღი *</span>
            <input type="date" name="" id="" />
          </div>
          {/* i'll make custom category picker later, this is just for design purposes */}
          <div className="category-container">
            <span className="input-header">კატეგორია *</span>
            <select>
              <option>აირჩიეთ კატეგორია</option>
            </select>
          </div>
        </div>
        <div className="email-container">
          <span className="input-header">ელ-ფოსტა *</span>
          <input type="text" placeholder="შეიყვანეთ ელ-ფოსტა" />
        </div>
        <div className="btn-container">
          <button className="btn">გამოქვეყნება</button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: calc(100vh - 8rem);
  background-color: #fbfaff;
  position: relative;
  padding-top: 4rem;

  .arrow-icon {
    position: absolute;
    left: 7.6rem;
    cursor: pointer;
  }

  form {
    margin-left: 36rem;
    width: 60rem;
  }

  .header {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4rem;
    margin-bottom: 4rem;
  }

  .input-header {
    font-weight: 500;
    line-height: 2rem;
    display: inline-block;
    margin-bottom: 0.8rem;
  }

  input[type="file"] {
    display: none;
  }

  .author-and-title-container {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
  }

  .author-and-title-container div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .author-and-title-container ul {
    list-style-position: inside;
  }

  input[type="text"],
  textarea {
    width: 28.8rem;
    height: 4.4rem;
  }

  input[type="text"]::placeholder,
  textarea::placeholder {
    color: var(--gray);
  }

  .validation-requirements {
    color: var(--gray);
    font-size: 1.2rem;
    line-height: 2rem;
  }

  .description-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2.4rem;
  }

  textarea {
    width: 60rem;
    height: 12.4rem;
    resize: none;
  }

  .date-and-category-container {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
  }

  input[type="date"] {
    width: 28.8rem;
    height: 4.4rem;
  }

  select {
    width: 28.8rem;
    height: 4.4rem;
  }

  .email-container {
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
  }

  input[type="email"] {
    width: 28.8rem;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    width: 28.8rem;
    height: 4.4rem;
    padding: 1rem 2rem;
    border-radius: 0.8rem;
    background-color: var(--light-gray);
    border: none;
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--white);
    font-family: inherit;
  }
`;

export default AddBlogPage;
