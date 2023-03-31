import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/categories/category.selector";
import Spinner from "../spinner/spinner.component";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const handelRouteClick = () => {
    navigate(`/shops/${title}`);
  };

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title onClick={handelRouteClick}>{title.toUpperCase()}</Title>
      </h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <Preview>
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Preview>
      )}
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
