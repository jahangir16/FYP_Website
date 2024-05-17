import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


import PropTypes from 'prop-types';
function ProductDetails() {
    const { productId } = useParams();
    console.log(productId);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${productId}`)
      .then(response => {
        setProduct(response.data.product);
        if (Array.isArray(response.data.reviews)) {
            setReviews(response.data.reviews);
          } else {
            setReviews([]);
          }
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

return (
    <div>
        <div className="canvas-paper">
            <div className="bg-white pt-4 pr-8 pb-4 pl-8">
                <div className="bg-white text-gray-800 sm:p-6 lg:p-8 p-4">
                    <div className="mx-auto max-w-4xl">
                        {product && (
                            <>
                                <p className="text-2xl font-bold mb-4">{product.productname}</p>
                                <div className="lg:flex-row flex flex-row">
                                    <img src={product.image_urls} alt={product.productname} className="w-full lg:w-1/3 lg:mb-0 lg:mr-6 rounded-md shadow-md mb-4" />
                                    <div className="flex-1">
                                        <p className="text-xl font-semibold mb-2 flex">{product.productname}</p>
                                        <p className="text-gray-700 mb-1 flex"><strong>Brand:</strong> {product.brandname}</p>
                                        <p className="text-gray-700 mb-1 flex"><strong>Category:</strong> {product.category}</p>
                                        <p className="text-gray-700 mb-1 flex"><strong>Rating:</strong> ⭐ {product.rating}</p>
                                        <div className="items-center mb-2 flex">
                                            <span className="text-indigo-600 text-lg font-bold mr-2">{product.discountprice}</span>
                                            <span style={{ textDecoration: 'line-through' }} className="text-gray-500">{product.originalprice}</span>
                                        </div>
                                        <div className='flex'>
                                            <a href={product.producturl} target="_blank" className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md inline-block">View on Daraz</a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="bg-white text-gray-800 sm:p-6 lg:p-8 p-4">
                    <div className="mx-auto max-w-4xl">
                        <p className="text-2xl font-bold mb-4">Product Reviews</p>
                        <ul className="space-y-4">
                            {reviews.map(review => (
                                <li key={review.id} className="rounded-md shadow-sm border border-gray-300 p-4">
                                    <p className="text-gray-700">{review.review_content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

// Your component code...

ProductDetails.propTypes = {
  productId: PropTypes.number.isRequired,
};
  

export default ProductDetails;
