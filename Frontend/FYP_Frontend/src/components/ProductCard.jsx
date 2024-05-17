import  { useState, useEffect } from 'react';
import axios from 'axios';
//import ProductDetails from './ProductDetails';
//import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Initial page number

  useEffect(() => {
    axios.get(`http://localhost:8080/products?page=${page}`)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
    }, [page]);// Fetch data whenever the page state changes

  return (
    <>
    <div>
    {products && products.length !== 0 ? ( 
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              
               <div key={product.id}  className="group">
               <Link to={`/product/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.image_urls} alt={product.productname}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.productname}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.discountprice}</p>
                </Link>
              </div>
            ))}
          </div>
        
        </div>
      </div>
    ) : (
        <p>Loading...</p>
       )}
  
      <button onClick={() => setPage(prevPage => prevPage - 1)}>Previous Page</button>
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Next Page</button>

      </div>
</>
   
    )
}
export default ProductCard;