import { BiImageAlt } from "react-icons/bi";
import {
  getFromLocalStorage,
  setIntoLocalStorage,
} from "../services/imageGallary.services";
import { useEffect, useState } from "react";
import randomIdGenerator from "../utils";

type PropsType = {
  uploadedImages: { url: string; id: string }[];
  setUploadedImages: (arg: Array<{ url: string; id: string }>) => void;
};

const UploadImage = ({ uploadedImages, setUploadedImages }: PropsType) => {
  const [file, setFile] = useState<unknown>(null);

  // file handling onchange function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result && !isCancel) {
          setUploadedImages([
            ...uploadedImages,
            { url: result as string, id: randomIdGenerator(10) },
          ]);
          const images = getFromLocalStorage("images") as Array<{
            url: string;
            id: string;
          }>;
          if (images) {
            setIntoLocalStorage(
              "images",
              JSON.stringify([
                ...images,
                { url: result as string, id: randomIdGenerator(10) },
              ])
            );
          } else {
            setIntoLocalStorage(
              "images",
              JSON.stringify([
                { url: result as string, id: randomIdGenerator(10) },
              ])
            );
          }
        }
      };
      fileReader.readAsDataURL(file as Blob);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <form className="image-gallary__form">
      <label className="image-gallary__upload-image">
        <BiImageAlt />
        Add Images
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => handleChange(e)}
          accept="image/*"
        />
      </label>
    </form>
  );
};

export default UploadImage;
