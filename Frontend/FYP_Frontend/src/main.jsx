import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
//import {createBrowserRouter,RouterProvider,} from 'react-router-dom';  
import { BrowserRouter } from 'react-router-dom'
/*
import ErrorPage from './error-page';
import ProductDetails from './components/ProductDetails.jsx';
import ProductCard from './components/ProductCard.jsx';

import { loader as rootLoader } from './routes/root.jsx';

/*const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: 'products',
        element: <ProductCard />,
        children: [
          {
            path: 'product-details/:productId',
            element: <ProductDetails />,
          },
        ],
      },
    ],
  },
//]);
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);
