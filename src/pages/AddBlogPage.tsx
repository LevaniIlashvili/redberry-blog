import styled from "styled-components";
import UploadImage from "../components/UploadImage";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import CategoryInput from "../components/CategoryInput";
import { CategoryType } from "../types/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState({
    author: "",
    isCharValid: false,
    isWordValid: false,
    isGeorgian: false,
    isFocused: false,
  });
  const [title, setTitle] = useState({
    title: "",
    isCharValid: false,
    isFocused: false,
  });
  const [description, setDescription] = useState({
    description: "",
    isCharValid: false,
    isFocused: false,
  });
  const [date, setDate] = useState({
    date: "",
    isValid: false,
    isFocused: false,
  });
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [email, setEmail] = useState({
    email: "",
    isFocused: false,
    isValid: false,
  });

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAuthor = e.target.value;
    const isCharValid = newAuthor.length >= 4;
    const isWordValid =
      newAuthor.split(/\s+/).filter((word) => word.length > 0).length >= 2;
    const isGeorgian = /^[\u10A0-\u10FF\s]+$/.test(newAuthor);

    setAuthor({
      ...author,
      author: newAuthor,
      isCharValid,
      isWordValid,
      isGeorgian,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const isCharValid = newTitle.length >= 2;

    setTitle({ ...title, title: newTitle, isCharValid });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    const isCharValid = newDescription.length >= 2;

    setDescription({
      ...description,
      description: newDescription,
      isCharValid,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const inputDate = new Date(e.target.value);
    let isDateValid = false;
    console.log(e.target.value.length);
    if (e.target.value.length === 10 && inputDate > now) isDateValid = true;
    setDate({ ...date, date: e.target.value, isValid: isDateValid });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const isValid = newEmail.endsWith("@redberry.ge");

    setEmail({ ...email, email: newEmail, isValid });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("author", author.author);
    formData.append("title", title.title);
    formData.append("description", description.description);
    formData.append("publish_date", date.date);
    formData.append("email", email.email);
    formData.append(
      "categories",
      JSON.stringify(categories.map((category) => category.id))
    );
    try {
      const res = await axios.post(
        "https://api.blog.redberryinternship.ge/api/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const disabled =
    image &&
    author.isCharValid &&
    author.isWordValid &&
    author.isGeorgian &&
    title.isCharValid &&
    description.isCharValid &&
    date.isValid &&
    categories.length &&
    (email.email ? (email.isValid ? true : false) : true)
      ? false
      : true;

  return (
    <Wrapper>
      <img
        src="src/assets/arrow.svg"
        alt="arrow icon"
        className="arrow-icon"
        width={44}
        height={44}
        onClick={() => navigate("/")}
      />
      <form onSubmit={handleSubmit}>
        <h1 className="header">ბლოგის დამატება</h1>
        <span className="input-header">ატვირთეთ ფოტო</span>
        <UploadImage image={image} setImage={setImage} />
        <div className="author-and-title-container">
          <div>
            <span className="input-header">ავტორი *</span>
            <input
              type="text"
              placeholder="შეიყვანეთ ავტორი"
              value={author.author}
              onChange={handleAuthorChange}
              onFocus={() => setAuthor({ ...author, isFocused: true })}
              onBlur={() => setAuthor({ ...author, isFocused: false })}
              style={{
                backgroundColor:
                  author.author &&
                  (!author.isFocused
                    ? author.isCharValid &&
                      author.isWordValid &&
                      author.isGeorgian
                      ? "#F8FFF8"
                      : "#FAF2F3"
                    : ""),
                borderColor:
                  author.author &&
                  !author.isFocused &&
                  (!author.isCharValid ||
                    !author.isWordValid ||
                    !author.isGeorgian)
                    ? "var(--error-color)"
                    : !author.isFocused &&
                      author.isCharValid &&
                      author.isWordValid &&
                      author.isGeorgian
                    ? "var(--success-color)"
                    : "",
              }}
            />
            <ul className="validation-requirements">
              <li
                style={{
                  color:
                    (author.author &&
                      (author.isFocused
                        ? author.isCharValid
                          ? "var(--success-color)"
                          : ""
                        : author.isCharValid
                        ? ""
                        : "var(--error-color)")) ||
                    "",
                }}
              >
                მინიმუმ 4 სიმბოლო
              </li>
              <li
                style={{
                  color:
                    (author.author &&
                      (author.isFocused
                        ? author.isWordValid
                          ? "var(--success-color)"
                          : ""
                        : author.isWordValid
                        ? ""
                        : "var(--error-color)")) ||
                    "",
                }}
              >
                მინიმუმ ორი სიტყვა
              </li>
              <li
                style={{
                  color:
                    (author.author &&
                      (author.isFocused
                        ? author.isGeorgian
                          ? "var(--success-color)"
                          : ""
                        : author.isGeorgian
                        ? ""
                        : "var(--error-color)")) ||
                    "",
                }}
              >
                მხოლოდ ქართული სიმბოლოები
              </li>
            </ul>
          </div>
          <div>
            <span className="input-header">სათაური *</span>
            <input
              type="text"
              placeholder="შეიყვანეთ სათაური"
              value={title.title}
              onChange={handleTitleChange}
              onFocus={() => setTitle({ ...title, isFocused: true })}
              onBlur={() => setTitle({ ...title, isFocused: false })}
              style={{
                backgroundColor:
                  title.title &&
                  (!title.isFocused
                    ? title.isCharValid
                      ? "#F8FFF8"
                      : "#FAF2F3"
                    : ""),
                borderColor:
                  title.title && !title.isFocused && !title.isCharValid
                    ? "var(--error-color)"
                    : !title.isFocused && title.isCharValid
                    ? "var(--success-color)"
                    : "",
              }}
            />
            <span
              className="validation-requirements"
              style={{
                color:
                  (title.title &&
                    (title.isFocused
                      ? title.isCharValid
                        ? "var(--success-color)"
                        : ""
                      : title.isCharValid
                      ? ""
                      : "var(--error-color)")) ||
                  "",
              }}
            >
              მინიმუმ 2 სიმბოლო
            </span>
          </div>
        </div>
        <div className="description-container">
          <span className="input-header">აღწერა *</span>
          <textarea
            placeholder="შეიყვანეთ აღწერა"
            value={description.description}
            onChange={handleDescriptionChange}
            onFocus={() => setDescription({ ...description, isFocused: true })}
            onBlur={() => setDescription({ ...description, isFocused: false })}
            style={{
              backgroundColor:
                description.description &&
                (!description.isFocused
                  ? description.isCharValid
                    ? "#F8FFF8"
                    : "#FAF2F3"
                  : ""),
              borderColor:
                description.description &&
                !description.isFocused &&
                !description.isCharValid
                  ? "var(--error-color)"
                  : !description.isFocused && description.isCharValid
                  ? "var(--success-color)"
                  : "",
            }}
          />
          <span
            className="validation-requirements"
            style={{
              color:
                (description.description &&
                  (description.isFocused
                    ? description.isCharValid
                      ? "var(--success-color)"
                      : ""
                    : description.isCharValid
                    ? ""
                    : "var(--error-color)")) ||
                "",
            }}
          >
            მინიმუმ 2 სიმბოლო
          </span>
        </div>
        <div className="date-and-category-container">
          <div className="date-container">
            <span className="input-header">გამოქვეყნების თარიღი *</span>
            <input
              type="date"
              value={date.date}
              onFocus={() => setDate({ ...date, isFocused: true })}
              onBlur={() => setDate({ ...date, isFocused: false })}
              onChange={handleDateChange}
              style={{
                backgroundColor:
                  date.date &&
                  (!date.isFocused
                    ? date.isValid
                      ? "#F8FFF8"
                      : "#FAF2F3"
                    : ""),
                borderColor:
                  date.date && !date.isFocused && !date.isValid
                    ? "var(--error-color)"
                    : !date.isFocused && date.isValid
                    ? "var(--success-color)"
                    : "",
              }}
            />
            {date.date && !date.isFocused && !date.isValid && (
              <ErrorMessage error="შეიყვანეთ სწორი თარიღი" />
            )}
          </div>
          {/* i'll make custom category picker later, this is just for design purposes */}
          <div className="category-container">
            <span className="input-header">კატეგორია *</span>
            <CategoryInput
              selectedCategories={categories}
              setSelectedCategories={setCategories}
            />
          </div>
        </div>
        <div className="email-container">
          <span className="input-header">ელ-ფოსტა *</span>
          <input
            type="text"
            placeholder="შეიყვანეთ ელ-ფოსტა"
            value={email.email}
            onChange={handleEmailChange}
            onFocus={() => setEmail({ ...email, isFocused: true })}
            onBlur={() => setEmail({ ...email, isFocused: false })}
            style={{
              backgroundColor:
                email.email &&
                (!email.isFocused
                  ? email.isValid
                    ? "#F8FFF8"
                    : "#FAF2F3"
                  : ""),
              borderColor:
                email.email && !email.isFocused && !email.isValid
                  ? "var(--error-color)"
                  : !email.isFocused && email.isValid
                  ? "var(--success-color)"
                  : "",
            }}
          />
          {email.email && !email.isFocused && !email.isValid && (
            <ErrorMessage error="ემაილი უნდა მთავრდებოდეს @redberry.ge-ით" />
          )}
        </div>
        <div className="btn-container">
          <button
            disabled={disabled}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
              backgroundColor: disabled ? "var(--light-gray)" : "",
            }}
            className="btn"
          >
            გამოქვეყნება
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 120rem;
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
    width: 28.8rem;
  }

  input[type="email"] {
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    width: 28.8rem;
    height: 4.4rem;
  }
`;

export default AddBlogPage;
