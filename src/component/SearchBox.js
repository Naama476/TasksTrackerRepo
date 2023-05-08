import React, { useState } from "react";
import Button from "./Button";
import Task from "./Task";

function SearchBox({onHandleSearch,myRef}) {
  
  return (
    <div>
      <input type="text" ref={myRef} placeholder="Search..." />
      <Button text={"Search"} onClick={onHandleSearch}></Button>
    </div>
  );
}

export default SearchBox;
