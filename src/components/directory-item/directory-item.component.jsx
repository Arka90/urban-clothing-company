import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.style";

import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { imageUrl, title } = category;

  const handelCategoryNavigate = () => {
    navigate(`/shops/${title}`);
  };

  return (
    <DirectoryItemContainer onClick={handelCategoryNavigate}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        {/* <img /> */}
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
