import Navbar from "Navbar/Navbar.jsx";
import Product from "Product/Product.jsx";
import { AppProvider } from "Context/AppContext";

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Product />
    </AppProvider>
  );
}

export default App;
