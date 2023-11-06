import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
type PropsType = {
  totalSelected: string[];
  index: number;
  images: {
    url: string;
    id: string;
  };
  isFeatureImg: boolean;
  setTotalSelected: (arg: string[]) => void;
};

const SingleImage = ({
  totalSelected,
  setTotalSelected,
  images,
  isFeatureImg,
  index,
}: PropsType) => {
  const [select, setSelect] = useState(false);
  const handleSelect = (id: string) => {
    const isSelectId = totalSelected.find((selectedId) => selectedId === id);
    if (isSelectId) {
      const restImg = totalSelected.filter((imgId) => imgId != isSelectId);
      setTotalSelected(restImg);
      setSelect(false);
    } else {
      setTotalSelected([...totalSelected, id]);
      setSelect(true);
    }
  };

  return (
    <Draggable draggableId={images.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`image-gallary__image ${
            isFeatureImg ? "image-gallary__feature-image" : ""
          }`}
        >
          <img src={images.url} alt="" />
          <span
            onClick={() => handleSelect(images.id)}
            style={{
              display: `${select ? "block" : ""}`,
            }}
          >
            {select ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default SingleImage;
