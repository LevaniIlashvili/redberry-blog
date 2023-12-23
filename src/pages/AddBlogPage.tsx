import styled from "styled-components";

const AddBlogPage = () => {
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
        <div className="upload-file-container">
          <img
            src="src/assets/upload-icon.svg"
            alt="upload file icon"
            className="upload-file-icon"
            width={40}
            height={40}
          />
          <p>
            ჩააგდეთ ფაილი აქ ან{" "}
            <label className="upload-file-label">აირჩიეთ ფაილი</label>
          </p>
          <input type="file" id="blog-image" />
        </div>
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

  .upload-file-container {
    width: 60rem;
    height: 18rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.2rem;
    border: 1px dashed var(--gray);
    background-color: #f4f3ff;
    margin-bottom: 2.4rem;
  }

  .upload-file-icon {
    margin-bottom: 2.4rem;
  }

  input[type="file"] {
    display: none;
  }

  .upload-file-container p {
    font-size: 1.4rem;
  }

  .upload-file-label {
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
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
    border-radius: 1.2rem;
    border: 1px solid var(--light-gray);
    background: #fcfcfd;
    padding: 1.2rem 1.6rem;
    color: var(--black);
    outline: none;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  input[type="text"]::placeholder,
  textarea::placeholder {
    color: var(--gray);
  }

  input[type="text"]:focus,
  textarea:focus {
    border: 1.5px solid var(--blue);
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
    border-radius: 1.2rem;
    border: 1px solid var(--light-gray);
    padding: 1.2rem 4.8rem;
  }

  select {
    width: 28.8rem;
    height: 4.4rem;
    border-radius: 1.2rem;
    border: 1px solid var(--light-gray);
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
