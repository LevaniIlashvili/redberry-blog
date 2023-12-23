import styled from "styled-components";

const UploadImage = ({
  image,
  setImage,
}: {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type.split("/")[0] === "image") {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.split("/")[0] === "image") {
      setImage(droppedFile);
    }
  };

  return (
    <>
      {!image ? (
        <Wrapper
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src="src/assets/upload-icon.svg"
            alt="upload file icon"
            className="upload-icon"
            width={40}
            height={40}
          />
          <p>
            ჩააგდეთ ფაილი აქ ან{" "}
            <label htmlFor="blog-image">აირჩიეთ ფაილი</label>
          </p>
          <input onChange={handleChange} type="file" id="blog-image" />
        </Wrapper>
      ) : (
        <Wrapper2>
          <div>
            {" "}
            <img
              src="src/assets/gallery-icon.svg"
              alt="galery-icon"
              width={24}
              height={24}
            />
            <p>{image.name}</p>
          </div>
          <img
            src="src/assets/close-icon.svg"
            alt="close icon"
            className="close-icon"
            width={24}
            height={24}
            onClick={() => setImage(null)}
          />
        </Wrapper2>
      )}
    </>
  );
};

const Wrapper = styled.div`
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

  &:hover {
    background-color: #f1effb;
  }

  img {
    margin-bottom: 2.4rem;
  }

  p {
    font-size: 1.4rem;
  }

  label {
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
  }
`;

const Wrapper2 = styled.div`
  width: 60rem;
  height: 5.6rem;
  background-color: #f2f2fa;
  border-radius: 1.2rem;
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  z-index: 1;

  div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  p {
    font-size: 1.4rem;
  }

  .close-icon {
    cursor: pointer;
  }
`;

export default UploadImage;
