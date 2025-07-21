import "Navbar/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "Assets/images/hepsiburada-logo.jpg";
import Basket from "Basket/Basket.jsx";
import useAppContext from "Context/AppContext.jsx";
import SearchInput from "SearchInput/SearchInput.jsx";

function Navbar() {
  const { cardItems } = useAppContext();

  return (
    <div>
      <div className="navbar-container">
        <img src={logo} id="logo"></img>
        <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />

        <SearchInput />

        <Basket />

        {cardItems.length === 0 ? null : (
          <div className="number-of-products">
            {cardItems.length !== 0 ? cardItems.length : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
