import { ImCheckboxChecked } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import SingleImage from "../components/SingleImage";
import { useState, useEffect } from "react";
import UploadImage from "../components/UploadImage";
import {
  getFromLocalStorage,
  setIntoLocalStorage,
} from "../services/imageGallary.services";
import { defaultImages } from "../constants";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const ImageGallary = () => {
  if (!getFromLocalStorage("images")) {
    setIntoLocalStorage("images", JSON.stringify(defaultImages));
  }

  const [totalSelected, setTotalSelected] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; id: string }[]
  >([]);

  useEffect(() => {
    const images = getFromLocalStorage("images") as Array<{
      url: string;
      id: string;
    }>;

    if (images !== null) {
      setUploadedImages(images);
    }
  }, []);

  // delete all the selected image
  const handleDelete = () => {
    const images = getFromLocalStorage("images") as Array<{
      url: string;
      id: string;
    }>;

    const restImage = images.filter((image) => {
      // find delete image id
      const isDeleted = totalSelected.find((selectId) => selectId === image.id);
      if (!isDeleted) {
        return image;
      }
    });
    setIntoLocalStorage("images", JSON.stringify(restImage));
    setUploadedImages(restImage);
    setTotalSelected([]);
    console.log("from delete func", restImage);
  };

  const onDragEng = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const newUploadedImages = Array.from(uploadedImages);
    const [removeImage] = newUploadedImages.splice(source.index, 1);
    newUploadedImages.splice(destination.index, 0, removeImage);
    setUploadedImages(newUploadedImages);
  };

  return (
    <section className="image-gallary">
      <div className="image-gallary__container">
        <div className="image-gallary__top-bar">
          <div className="image-gallary__selected-file">
            <ImCheckboxChecked />{" "}
            <span> {totalSelected.length} File Selected </span>
          </div>
          <div
            className="image-gallary__delete-icon"
            onClick={() => handleDelete()}
          >
            <AiFillDelete /> <span> Delete files </span>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEng}>
          <Droppable droppableId="imageList">
            {(provided) => (
              <div
                className="image-gallary__images"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {uploadedImages.map((images, idx) => (
                  <SingleImage
                    index={idx}
                    key={images.id}
                    isFeatureImg={idx == 0 ? true : false}
                    images={images}
                    setTotalSelected={setTotalSelected}
                    totalSelected={totalSelected}
                  />
                ))}
                <div>
                  <UploadImage
                    uploadedImages={uploadedImages}
                    setUploadedImages={setUploadedImages}
                  />
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
};

export default ImageGallary;
