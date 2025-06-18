import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
    <div style={{display:"flex" , justifyContent:"space-around"}}>
    <Link to="/">Home</Link>
    <Link to="/todolist">Todo List</Link>
     <Link to="/adduser">Add User</Link>
      <Link to="/addtodo">Add Todo</Link>
       <Link to="/addnote">Add Note</Link>
    
    </div>
     
    </>
  );
}

export default Navbar;


