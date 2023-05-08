import { useContext, useState } from "react";
import { StoreContext } from "../StoreContext";
import { observer } from "mobx-react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit, FaCircle, FaCircleNotch } from "react-icons/fa";
import App from "../App.css";
import ModalDialog from "./ModalDialog";
import EditModal from "./EditModal";
const Task = ({ task }) => {
  let store = useContext(StoreContext);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  const [modalEdit, setModalEdit] = useState(false);
  const toggleEditModal = () => {
    setModalEdit(!modalEdit);
    console.log("EdidM", modalEdit);
  };

  return (
    <>
      <div className="event">
        <h3>
          {task.text}

          <FaEdit style={{ color: "black" }} onClick={toggleEditModal} />
          <FaTrashAlt
            style={{ color: "black" }}
            onClick={
              task.protect
                ? () => toggleModal(task)
                : () => store.onDelete(task, store.currentUser)
            }
          />
          {task.complited ? (
            <FaCircle
              style={{ color: "green" }}
              onClick={() => store.updateComplited(task.id)}
            />
          ) : (
            <FaCircleNotch onClick={() => store.updateComplited(task.id)} />
          )}
          {modal && (
            <ModalDialog
              toggleModal={() => toggleModal(task)}
              task={task}
              onDelete={() => store.onDelete(task, store.currentUser)}
            ></ModalDialog>
          )}
          {modalEdit && (
            <EditModal
              toggleEditModal={toggleEditModal}
              task={task}
              id={task.id}
            ></EditModal>
          )}
        </h3>
      </div>
    </>
  );
};
export default observer(Task);
