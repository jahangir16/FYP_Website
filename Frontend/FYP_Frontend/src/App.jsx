import './App.css'
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import { Route, BrowserRouter, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<ProductCard />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App