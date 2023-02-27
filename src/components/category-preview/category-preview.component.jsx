import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import { useNavigate } from "react-router-dom";
const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();
  const handelRouteClick = () => {
    navigate(`/shops/${title}`);
  };

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title onClick={handelRouteClick}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
