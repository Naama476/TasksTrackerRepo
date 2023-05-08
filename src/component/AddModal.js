import { useRef } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { observer } from "mobx-react";
const AddModal = ({ toggleAddModal }) => {
  let store = useContext(StoreContext);
  const text = useRef(null);
  const date = useRef(null);
  const time = useRef(null);
  const protect = useRef(null);
  const priority = useRef(null);
  const onSubmit = () => {
    const idNew = Math.floor(Math.random() * 10000) + 1;
    const taskToAdd = {
      id: idNew,
      text: text.current.value,
      date: date.current.value,
      time: time.current.value,
      priority: priority.current.value,
      protect: protect.current.value
    };
    store.addTodo(taskToAdd);
  };
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2>Create new task</h2>
          <form className="add-form">
            <div className="form-control">
              <lable>Task</lable>
              <input type="text" placeholder="Add Task" ref={text} />
            </div>
          </form>
          <form className="add-form">
            <div className="form-control">
              <lable>Date</lable>
              <input type="text" placeholder="Add Date" ref={date} />
            </div>
          </form>
          <form className="add-form">
            <div className="form-control">
              <lable>Time</lable>
              <input type="text" placeholder="Add Time" ref={time} />
            </div>
          </form>
          <form className="add-form">
            <div className="form-control">
              <lable>Priority</lable>
              <select onClick={() => console.log("its work!")} ref={priority}>
                <option value="Hige">High</option>
                <option value="Meduim">Meduim</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </form>
          <form className="add-form">
            <div className="form-control form-control-check">
              <lable>Set protect</lable>
              <input type="checkbox" ref={protect} />
            </div>
          </form>
          <button className="close-modal" onClick={toggleAddModal}>
            Cancel
          </button>
          <button className="delete-task" onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};
export default observer(AddModal);
