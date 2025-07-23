import { useEffect, useState } from "react";
import "Product/Product.css";
import Button from "Button/Button.jsx";
import CardContent from "CardContent/CardContent.jsx";
import Pagination from "Pagination/Pagination.jsx";
import Select from "Select/Select.jsx";
import Filter from "Filter/Filter.jsx";
import useAppContext from "Context/AppContext.jsx";
import { fetchProducts } from "Services/APIService.jsx";
import { OPTIONS, ITEMSPERPAGE } from "Constants/Constants.js";

function Product() {
  const { searchProduct, addToCard, cardItems } = useAppContext();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [sorting, setSorting] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  //products.slice(start, end) : dizinin belirli bir aralığını döner
  const startIndex = (currentPage - 1) * ITEMSPERPAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMSPERPAGE
  );
  const paginatedFiltered = filtered.slice(
    startIndex,
    startIndex + ITEMSPERPAGE
  );

  const isSearching = searchProduct.trim() !== "";

  const isFiltered =
    searchProduct.trim() !== "" ||
    selectedBrand !== "" ||
    selectedColor !== "" ||
    sorting !== "";
  const productsToShow = isFiltered ? paginatedFiltered : paginatedProducts;

  const pageCount = Math.ceil(
    (isFiltered ? filtered.length : products.length) / ITEMSPERPAGE
  );
  const handleChange = (page) => setCurrentPage(page);
  //kullanıcının seçtiği sayfa numarasına göre güncelledim

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFiltered(data);

        const brands = [...new Set(data.map((p) => p.brand))];
        const colors = [...new Set(data.map((p) => p.color))];

        setBrandOptions(brands);
        setColorOptions(colors);
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchProduct.length > 1) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setFiltered(filteredProducts);
      setCurrentPage(1);
    }
  }, [searchProduct, products]);

  useEffect(() => {
    let temp = [...products];

    if (searchProduct.length > 2) {
      temp = temp.filter((product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    if (selectedBrand !== "") {
      temp = temp.filter((product) => product.brand === selectedBrand);
    }

    if (selectedColor !== "") {
      temp = temp.filter((product) => product.color === selectedColor);
    }

    if (sorting !== "") {
      switch (sorting) {
        case "lowest":
          temp.sort((a, b) => a.discountedPrice - b.discountedPrice);
          break;
        case "highest":
          temp.sort((a, b) => b.discountedPrice - a.discountedPrice);
          break;
        case "az":
          temp.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "za":
          temp.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }

    setFiltered(temp);
  }, [searchProduct, products, selectedBrand, selectedColor, sorting]);

  const handleSelect = (value) => {
    if (sorting === value) {
      setSorting("");
    } else {
      setSorting(value);
    }
  };

  const colorsCount = {};
  products.forEach((product) => {
    const colors = product.color;
    if (colorsCount[colors]) {
      colorsCount[colors] += 1;
    } else {
      colorsCount[colors] = 1;
    }
  });

  const brandCount = {};
  products.forEach((product) => {
    const brands = product.brand;
    if (brandCount[brands]) {
      brandCount[brands] += 1;
    } else {
      brandCount[brands] = 1;
    }
  });

  return (
    <>
      <div className="searchText" style={{ display: "flex" }}>
        {isSearching && searchProduct.length > 2 ? (
          <div style={{ display: "flex" }}>
            <p style={{ color: "gray", marginLeft: "15px" }}>Aranan Kelime: </p>
            <p style={{ color: "black", marginLeft: "10px" }}>
              <b>{searchProduct}</b>
            </p>
          </div>
        ) : null}
      </div>

      <div className="select-container">
        <Select
          value={sorting}
          placeholder="Sıralama"
          onChange={handleSelect}
          options={OPTIONS}
        />
      </div>
      <div className="filter-product-container">
        <div className="filter">
          <Filter
            brandOptions={brandOptions}
            colorOptions={colorOptions}
            sortOptions={OPTIONS}
            selectedBrand={selectedBrand}
            selectedColor={selectedColor}
            selectedSort={sorting}
            onBrandChange={(brand) => {
              if (brand === selectedBrand) {
                setSelectedBrand("");
              } else {
                setSelectedBrand(brand);
              }
            }}
            onColorChange={(color) => {
              if (color === selectedColor) {
                setSelectedColor("");
              } else {
                setSelectedColor(color);
              }
            }}
            onSortChange={handleSelect}
            colorsCount={colorsCount}
            brandCount={brandCount}
          ></Filter>
        </div>
        <div className="products-container">
          {productsToShow.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="base-card">
                <CardContent
                  image={product.image}
                  imageStyle={{
                    height: "400px",
                    width: "100%",
                    objectFit: "contain",
                    border: "1px solid rgb(222, 222, 222, 1)",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                  }}
                  name={product.name}
                  showBrandLabel={true}
                  brand={product.brand}
                  color={product.color}
                  discountedPrice={product.discountedPrice}
                  originalPrice={product.originalPrice}
                  rate={product.rate}
                  showColorLabel={true}
                  showOriginalPrice={true}
                  showDiscountedPrice={true}
                  showRate={true}
                ></CardContent>
              </div>

              <div className="product-hover-card">
                <CardContent
                  image={product.imageSecond}
                  imageStyle={{
                    width: "100%",
                    height: "400px",
                    objectFit: "contain",
                    padding: "8px",
                    border: "1px solid rgb(222, 222, 222, 1)",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                  }}
                  name={product.name}
                  showBrandLabel={false}
                  showOriginalPrice={false}
                  showDiscountedPrice={false}
                  showRate={false}
                ></CardContent>
                <Button
                  disabled={cardItems.some((item) => item.id === product.id)}
                  className="addtocart-btn"
                  onClick={() => {
                    addToCard(product);
                  }}
                >
                  {cardItems.some((item) => item.id === product.id)
                    ? "Bu ürünü sepete ekleyemezsin"
                    : "Sepete Ekle"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {productsToShow.length > 0 ? (
        <div className="pagination">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChange}
          ></Pagination>
        </div>
      ) : (
        <div className="no-product">
          <p>Ürün bulunamadı.</p>
        </div>
      )}
    </>
  );
}

export default Product;
