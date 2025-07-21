import Button from "Button/Button.jsx";
import useAppContext from "Context/AppContext.jsx";
import "DeleteModal/DeleteModal.css";

function DeleteModal() {
  const { cancelDelete, confirmDeleteItem } = useAppContext();

  return (
    <div className="delete-modal">
      <p>
        <b>Ürünü silmek istediğinize emin misiniz?</b>
      </p>
      <hr className="line"></hr>
      <p className="delete-modal-context">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam omnis
        eaque minima in dolores, est vel suscipit voluptatibus voluptates quo
        quas amet temporibus quibusdam doloremque officiis aspernatur! Tenetur,
        maxime aspernatur.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.Totam omnis eaque minima in dolores.
      </p>
      <div className="deleteModal-btn">
        <Button
          className="confirmDelete-btn"
          onClick={() => {
            confirmDeleteItem();
          }}
        >
          EVET
        </Button>

        <Button
          className="cancel-btn"
          onClick={() => {
            cancelDelete();
          }}
        >
          HAYIR
        </Button>
      </div>
    </div>
  );
}

export default DeleteModal;
