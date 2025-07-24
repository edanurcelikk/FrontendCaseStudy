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
    <div className="basket-container">
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

      {isDeleteModalOpen && (
        <DeleteModal
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam omnis
        eaque minima in dolores, est vel suscipit voluptatibus voluptates quo
        quas amet temporibus quibusdam doloremque officiis aspernatur! Tenetur,
        maxime aspernatur.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.Totam omnis eaque minima in dolores."
          confirmDeleteText="EVET"
          cancelDeleteText="HAYIR"
        />
      )}
    </div>
  );
}

export default Basket;
