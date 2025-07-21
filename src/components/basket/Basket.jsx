import Button from "Button/Button.jsx";
import CardContent from "CardContent/CardContent.jsx";
import useAppContext from "Context/AppContext.jsx";
import DeleteModal from "DeleteModal/DeleteModal.jsx";
import "Basket/Basket.css";

function Basket() {
  const {
    cardItems,
    isDeleteModalOpen,
    requestDeleteItem,
    isToggleOpen,
    setToogleOpen,
    cartModalRef,
  } = useAppContext();

  const showCart = () => {
    setToogleOpen(!isToggleOpen);
  };

  return (
    <div>
      <Button className="cart-btn" onClick={showCart}>
        Sepetim
      </Button>

      {isToggleOpen ? (
        <div ref={cartModalRef} className="cart-menu">
          {cardItems.length === 0 ? (
            <p className="empty-card">Sepetiniz boş.</p>
          ) : (
            cardItems.map((item) => (
              <div className="cart" key={item.id}>
                <CardContent
                  image={item.image}
                  imageStyle={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    padding: "4px",
                    marginRight: "12px",
                  }}
                >
                  <p className="card-title">{item.name}</p>

                  <Button
                    className="request-btn"
                    onClick={() => requestDeleteItem(item)}
                  >
                    Kaldır
                  </Button>
                </CardContent>
              </div>
            ))
          )}
        </div>
      ) : null}

      {isDeleteModalOpen && <DeleteModal />}
    </div>
  );
}

export default Basket;
