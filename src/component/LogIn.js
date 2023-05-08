import App from "../App.css";
import Button from "./Button";
import { useState, useRef } from "react";
import { observer } from "mobx-react";
import Tasks from "./Tasks";
const LogIn = ({ store }) => {
  const [isLogged, setIsLogged] = useState(false);

  const myRef = useRef(null);

  const onToggleLog = () => {
    setIsLogged(!isLogged);
  };

  const onHandelClick = () => {
    if (store.logIn(myRef.current.value)) {
      alert("log in succesful");
      console.log(store.isLogged);
      onToggleLog();
    } else {
      alert("user not found");
    }
  };

  return (
    <>
      {!isLogged && (
        <div className="container">
          Name{" "}
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            ref={myRef}
          />
          <Button text="Enter" onClick={onHandelClick} color={"black"}></Button>
        </div>
      )}
      {isLogged && (
        <Tasks onHandelog={onToggleLog} user={store.currentUser}></Tasks>
      )}
    </>
  );
};

export default observer(LogIn);
