import styled from "styled-components";
import UploadImage from "../components/UploadImage";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import CategoryInput from "../components/CategoryInput";
import { CategoryType } from "../types/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBlogModal from "../components/AddBlogModal";
import { setBlogs } from "../app/redux/blogs/blogs";
import { useAppSelector } from "../app/hooks";

const AddBlogPage = () => {
  const blogs = useAppSelector((state) => state.blogs.blogs);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState({
    author: localStorage.getItem("author") || "",
    isCharValid: false,
    isWordValid: false,
    isGeorgian: false,
  });
  const [title, setTitle] = useState({
    title: localStorage.getItem("title") || "",
    isCharValid: false,
  });
  const [description, setDescription] = useState({
    description: localStorage.getItem("description") || "",
    isCharValid: false,
  });
  const [date, setDate] = useState({
    date: localStorage.getItem("date") || "",
    isValid: false,
  });
  const [categories, setCategories] = useState<CategoryType[]>(
    localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories")!)
      : []
  );
  const setSelectedCategories = (categories: CategoryType[]) => {
    setCategories(categories);
    localStorage.setItem("categories", JSON.stringify(categories));
  };
  const [email, setEmail] = useState({
    email: localStorage.getItem("email") || "",
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
    localStorage.setItem("author", newAuthor);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const isCharValid = newTitle.length >= 2;

    setTitle({ ...title, title: newTitle, isCharValid });
    localStorage.setItem("title", newTitle);
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
    localStorage.setItem("description", newDescription);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const inputDate = new Date(e.target.value);
    let isDateValid = false;
    if (e.target.value.length === 10 && inputDate > now) isDateValid = true;
    setDate({ ...date, date: e.target.value, isValid: isDateValid });
    localStorage.setItem("date", e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const isValid = newEmail.endsWith("@redberry.ge");

    setEmail({ ...email, email: newEmail, isValid });
    localStorage.setItem("email", newEmail);
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
      setBlogs([...blogs, res.data]);
      setIsModalOpen(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const authorEvent: React.ChangeEvent<HTMLInputElement> = {
      target: { value: author.author },
    } as React.ChangeEvent<HTMLInputElement>;

    const titleEvent: React.ChangeEvent<HTMLInputElement> = {
      target: { value: title.title },
    } as React.ChangeEvent<HTMLInputElement>;

    const descriptionEvent: React.ChangeEvent<HTMLTextAreaElement> = {
      target: { value: description.description },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    const dateEvent: React.ChangeEvent<HTMLInputElement> = {
      target: { value: date.date },
    } as React.ChangeEvent<HTMLInputElement>;

    const emailEvent: React.ChangeEvent<HTMLInputElement> = {
      target: { value: email.email },
    } as React.ChangeEvent<HTMLInputElement>;

    handleAuthorChange(authorEvent);
    handleTitleChange(titleEvent);
    handleDescriptionChange(descriptionEvent);
    handleDateChange(dateEvent);
    handleEmailChange(emailEvent);
  }, []);

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
      {isModalOpen && (
        <AddBlogModal
          handleClick={() => {
            setIsModalOpen(false);
            navigate("/");
            setImage(null);
            setAuthor({ ...author, author: "" });
            localStorage.removeItem("author");
            setTitle({ ...title, title: "" });
            localStorage.removeItem("title");
            setDescription({ ...description, description: "" });
            localStorage.removeItem("description");
            setDate({ ...date, date: "" });
            localStorage.removeItem("date");
            setCategories([]);
            localStorage.removeItem("categories");
            setEmail({ ...email, email: "" });
            localStorage.removeItem("email");
          }}
        />
      )}
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
              style={{
                backgroundColor: author.author
                  ? author.isGeorgian &&
                    author.isCharValid &&
                    author.isWordValid
                    ? "#F8FFF8"
                    : "#FAF2F3"
                  : "",
                borderColor: author.author
                  ? author.isGeorgian &&
                    author.isCharValid &&
                    author.isWordValid
                    ? "var(--success-color)"
                    : "var(--error-color)"
                  : "",
              }}
            />
            <ul className="validation-requirements">
              <li
                style={{
                  color: author.author
                    ? author.isCharValid
                      ? "var(--success-color)"
                      : "var(--error-color)"
                    : "",
                }}
              >
                მინიმუმ 4 სიმბოლო
              </li>
              <li
                style={{
                  color: author.author
                    ? author.isWordValid
                      ? "var(--success-color)"
                      : "var(--error-color)"
                    : "",
                }}
              >
                მინიმუმ ორი სიტყვა
              </li>
              <li
                style={{
                  color: author.author
                    ? author.isGeorgian
                      ? "var(--success-color)"
                      : "var(--error-color)"
                    : "",
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
              style={{
                backgroundColor: title.title
                  ? title.isCharValid
                    ? "#F8FFF8"
                    : "#FAF2F3"
                  : "",
                borderColor: title.title
                  ? title.isCharValid
                    ? "var(--success-color)"
                    : "var(--error-color)"
                  : "",
              }}
            />
            <span
              className="validation-requirements"
              style={{
                color: title.title
                  ? title.isCharValid
                    ? "var(--success-color)"
                    : "var(--error-color)"
                  : "",
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
            style={{
              backgroundColor: description.description
                ? description.isCharValid
                  ? "#F8FFF8"
                  : "#FAF2F3"
                : "",
              borderColor: description.description
                ? description.isCharValid
                  ? "var(--success-color)"
                  : "var(--error-color)"
                : "",
            }}
          />
          <span
            className="validation-requirements"
            style={{
              color: description.description
                ? description.isCharValid
                  ? "var(--success-color)"
                  : "var(--error-color)"
                : "",
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
              onChange={handleDateChange}
              style={{
                backgroundColor: date.date
                  ? date.isValid
                    ? "#F8FFF8"
                    : "#FAF2F3"
                  : "",
                borderColor: date.date
                  ? date.isValid
                    ? "var(--success-color)"
                    : "var(--error-color)"
                  : "",
              }}
            />
            {date.date && !date.isValid && (
              <ErrorMessage error="შეიყვანეთ სწორი თარიღი" />
            )}
          </div>
          {/* i'll make custom category picker later, this is just for design purposes */}
          <div className="category-container">
            <span className="input-header">კატეგორია *</span>
            <CategoryInput
              selectedCategories={categories}
              setSelectedCategories={setSelectedCategories}
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
            style={{
              backgroundColor: email.email
                ? email.isValid
                  ? "#F8FFF8"
                  : "#FAF2F3"
                : "",
              borderColor: email.email
                ? email.isValid
                  ? "var(--success-color)"
                  : "var(--error-color)"
                : "",
            }}
          />
          {email.email && !email.isValid && (
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
