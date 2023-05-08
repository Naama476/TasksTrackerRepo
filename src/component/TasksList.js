import Task from "./Task";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { observer } from "mobx-react";
import { toJS } from "mobx";

function TasksList({
  compTask,
  onToggleSortName,
  onToggleSortDate,
  onToggleSortPriority,
  iShowComplete,
  searchVal,
  onToggleSearch
}) {
  let store = useContext(StoreContext);

  const getTasks = () => {
    if (onToggleSortName) {
      const tasks = store.getSortByName;
      return tasks;
    }
    if (onToggleSortDate) {
      const tasks = store.getSortByDate;
      return tasks;
    }
    if (onToggleSortPriority) {
      const tasks = store.getSortByPriority;
      return tasks;
    }
    if(onToggleSearch){
      console.log(searchVal.current.value)
      store.onSearch(searchVal.current.value)
      const tasks = store.getSearchedTask;  
      return tasks;
    }
    
    else {
      const tasks = store.getUsersTasks;
      return tasks;
    }
  };
  // const allComplited = store.getAllComplited;

  return (
    <>
      {!iShowComplete && (
        <div className="container">
          {getTasks().map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
      {iShowComplete && (
        <div className="container">
          {compTask.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}
export default observer(TasksList);
