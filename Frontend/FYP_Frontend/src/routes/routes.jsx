import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx';
import ProductDetails from '../components/ProductDetails.jsx';
//import ProductCard from '../components/ProductCard.jsx';

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/product/:productId",
                element : <ProductDetails />
            }
        ]
    }
]
);
    
export default router;