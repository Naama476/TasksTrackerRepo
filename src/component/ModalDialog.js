import Modal from "../Modal.css";
const ModalDialog = ({ toggleModal, task, onDelete }) => {
  return (
    <>
      {task.protect && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>You are about to delete a protected task are you sure?</h2>
            <button className="close-modal" onClick={toggleModal}>
              Cancel
            </button>
            <button className="delete-task" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ModalDialog;
