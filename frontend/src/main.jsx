import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Store from './pages/Store.jsx';
import Cart from './pages/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/tienda" element={<Store />} />
      <Route path="/carrito" element={<Cart />} />
    </Routes>
  </BrowserRouter>,
)
