import { useState } from 'react'
import '../css/App.css';
import Navbar from './Navbar';
import Product from './Product';
import { CardProvider } from '../context/CardContext';

function App() {
  const [searchProduct, setSearchProduct] = useState('');

  return (
    <CardProvider>
      <Navbar setSearchProduct={setSearchProduct} />
      <Product searchProduct={searchProduct} />
    </CardProvider>
  )
}

export default App
