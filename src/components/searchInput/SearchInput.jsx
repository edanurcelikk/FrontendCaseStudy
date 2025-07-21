import useAppContext from "Context/AppContext.jsx";
import "SearchInput/SearchInput.css";

function SearchInput() {
  const { setSearchProduct } = useAppContext();

  const handleInputChange = (e) => {
    setSearchProduct(e.target.value);
  };

  return (
    <input
      onChange={handleInputChange}
      className="navbar-input"
      placeholder="25 milyondan fazla ürün içerisinde ara"
    ></input>
  );
}

export default SearchInput;
