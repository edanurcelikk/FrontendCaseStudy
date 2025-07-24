import { createContext, useState, useEffect, useContext, useRef } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [isToggleOpen, setToogleOpen] = useState(false);

  const [cardItems, setCardItems] = useState(() => {
    const storedItems = localStorage.getItem("cardItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // modal
  const [itemToDelete, setItemToDelete] = useState(null); //silinecek ürün
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (isToggleOpen && !isDeleteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggleOpen, isDeleteModalOpen]);

  const cartModalRef = useRef();

  const handleClickOutside = (event) => {
    if (cartModalRef.current && !cartModalRef.current.contains(event.target)) {
      setToogleOpen(false);
    }
    //modalRef.current.contains(event.target) ile tıklamanın modalın dışında olup olmadığı kontrol edilir
  };

  const addToCard = (product) => {
    setCardItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [{ ...product, quantity: 1 }, ...prevItems];
      }
      //sepete en son eklenen ürünün sepetin en başında olması için arrayin başına ekledik.

      localStorage.setItem("cardItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const requestDeleteItem = (product) => {
    setItemToDelete(product);
    setDeleteModalOpen(true);
    setProductName(product.name);
  };

  const confirmDeleteItem = () => {
    //silinecek ürün varsa
    if (itemToDelete) {
      //sepetteki silinmeyecek ürünleri güncelledim silinecek ürünü eklemediğimiz için silindi
      setCardItems((prev) => {
        const prevItems = prev.filter((item) => item.id !== itemToDelete.id);
        localStorage.setItem("cardItems", JSON.stringify(prevItems));
        return prevItems;
      });

      setItemToDelete(null);
      setDeleteModalOpen(false);
      setToogleOpen(true);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setDeleteModalOpen(false);
    setToogleOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        cardItems,
        addToCard,
        requestDeleteItem,
        cancelDelete,
        confirmDeleteItem,
        isDeleteModalOpen,
        searchProduct,
        setSearchProduct,
        isToggleOpen,
        setToogleOpen,
        cartModalRef,
        handleClickOutside,
        productName,
        setProductName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export default useAppContext;
