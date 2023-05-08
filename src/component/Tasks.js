import { useContext, useState, useRef } from "react";
import { StoreContext } from "../StoreContext";
import { observer } from "mobx-react";
import TasksList from "./TasksList";
import Button from "./Button";
import AddModal from "./AddModal";
import App from "../App";
import { FaSignInAlt } from "react-icons/fa";
import Stat from "./Stat";
import Dropdown from "./DropDown";
import SearchBox from "./SearchBox";
import DropDown from "../DropDown.css";

const Tasks = ({ user, onHandelog }) => {
  let store = useContext(StoreContext);
  const [addModal, setAddModal] = useState(false);
  const [iShowComplete, setShowComp] = useState(false);
  const [onToggleSortName, setToggleSortName] = useState(false);
  const [onToggleSortDate, setToggleSortDate] = useState(false);
  const [onToggleSortPriority, setToggleSortPriority] = useState(false);
  const [compTask, setCompTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [onToggleSearch,setToggleSearch] = useState(false);
  const [searchedTask, setSearchedTask] = useState([]);
  const myRef = useRef(null);


  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  const toggleShowComp = () => {
    setShowComp(!iShowComplete);
  };
  const ShowComp = () => {
    setCompTasks(store.getUsersTasks.filter((task) => task.complited === false));
    toggleShowComp();
  };

  const handleByName = () => {
    // store.sortBy("By Name");
    setToggleSortName(true);

    setToggleSortDate(false);
    setToggleSortPriority(false);
  };

  const handleByDate = () => {
    setToggleSortDate(true);

    setToggleSortName(false);
    setToggleSortPriority(false);
  };

  const handleByPriority = () => {
    setToggleSortPriority(true);

    setToggleSortDate(false);
    setToggleSortName(false);
  };

  const onHandleSearch = () => {
    console.log("onHandleSearch",myRef.current.value )
    // setSearchedTask(store.onSearch(myRef.current.value))
    setToggleSearch(true); 
  }

  return (
    <>
      <div className="container">
        <h3>Hi {user} these are your Tasks:</h3>
        <Button text={"Add"} onClick={toggleAddModal} color={"black"}></Button>
        {addModal && <AddModal toggleAddModal={toggleAddModal}></AddModal>}

        <Dropdown
          trigger={<button>Dropdown</button>}
          menu={[
            <button onClick={handleByName}>By name</button>,
            <button onClick={handleByDate}>By Date</button>,
            <button onClick={handleByPriority}>By Priority</button>
          ]}
        />

        <div className="btn">
          <FaSignInAlt
            onClick={onHandelog}
            style={{ backgroundColor: "black" }}
          ></FaSignInAlt>{" "}
          Switch User
        </div>
        <TasksList
          user={user}
          compTask={compTask}
          toggleShowComp={toggleShowComp}
          iShowComplete={iShowComplete}
          onToggleSortName={onToggleSortName}
          onToggleSortDate={onToggleSortDate}
          onToggleSortPriority={onToggleSortPriority}
          searchVal={myRef}
          onToggleSearch = {onToggleSearch}
        ></TasksList>
        <div>
          <SearchBox onHandleSearch={onHandleSearch} myRef={myRef} ></SearchBox>
        </div>
        <Button
          text={iShowComplete ? "Show All" : "Show Completed"}
          onClick={ShowComp}
          comp={"G"}
        ></Button>
      </div>

      <div className="stat">
        <Stat></Stat>
      </div>
    </>
  );
};

export default observer(Tasks);
