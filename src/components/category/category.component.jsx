import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryContainer } from "./category.styles";

import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <CategoryContainer>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </CategoryContainer>
  );
};

export default Category;
