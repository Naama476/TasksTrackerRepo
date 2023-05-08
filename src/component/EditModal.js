import { useRef } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { observer } from "mobx-react";
const EditModal = ({ toggleEditModal, task, id }) => {
  let store = useContext(StoreContext);
  const text = useRef(null);
  const date = useRef(null);
  const time = useRef(null);
  const protect = useRef(null);
  const priority = useRef(null);
  const onSubmit = () => {
    console.log(text.input);
    store.onEdit(
      id,
      text.current.value,
      date.current.value,
      time.current.value,
      priority.current.value,
      protect.current.value
    );
  };
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2>Edit Task</h2>
          <form className="add-form">
            <div className="form-control">
              <lable>Task</lable>
              <input type="text" ref={text} defaultValue={task.text} />
            </div>
          </form>
          <form className="add-form">
            <div className="form-control">
              <lable>Date</lable>
              <input type="text" ref={date} defaultValue={task.date} />
            </div>
          </form>
          <form className="add-form">
            <div className="form-control">
              <lable>Time</lable>
              <input type="text" ref={time} defaultValue={task.time} />
            </div>
          </form>
          <form className="add-form">
            <div className="form-control">
              <lable>Priority</lable>
              <select ref={priority} defaultValue={task.priority}>
                <option value="Hige">High</option>
                <option value="Meduim">Meduim</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </form>
          <form className="add-form">
            <div className="form-control form-control-check">
              <lable>Set protect</lable>
              <input
                type="checkbox"
                defaultValue={task.protect}
                ref={protect}
              />
            </div>
          </form>
          <button className="close-modal" onClick={toggleEditModal}>
            Cancel
          </button>
          <button className="delete-task" onClick={onSubmit}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
export default observer(EditModal);
