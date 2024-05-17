
import ProductsDetails  from "../components/ProductDetails";

export async function loader() {
  const productDetail = await ProductsDetails();
  return { productDetail };
}