import Button from "Button/Button.jsx";
import useAppContext from "Context/AppContext.jsx";
import "DeleteModal/DeleteModal.css";

function DeleteModal({ description, confirmDeleteText, cancelDeleteText }) {
  const { cancelDelete, confirmDeleteItem, productName } = useAppContext();

  return (
    <div className="delete-modal-container">
      <div>
        <p>
          <b>{productName} ürününü silmek istediğinize emin misiniz?</b>
        </p>

        <div>
          {description.length > 0 && (
            <div>
              <hr className="line"></hr>
              <p className="delete-modal-context">{description}</p>
            </div>
          )}
        </div>

        <div className="deleteModal-btn">
          <Button
            className="confirmDelete-btn"
            onClick={() => {
              confirmDeleteItem();
            }}
          >
            {confirmDeleteText}
          </Button>

          <Button
            className="cancel-btn"
            onClick={() => {
              cancelDelete();
            }}
          >
            {cancelDeleteText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
