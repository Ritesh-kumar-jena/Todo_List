import React from "react";
import {Route , Routes} from  'react-router-dom'
import Home from "../pages/Home";
import AddUser from "../pages/AddUser";
import AddTodo from "../pages/AddTodo";
import AddNote from "../pages/AddNote";
import TodoList from "../pages/TodoList";




function Allroutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/adduser" element={<AddUser/>}/>
        <Route path="/addtodo" element={<AddTodo/>}/>
        <Route path="/addnote" element={<AddNote/>}/>
        <Route path="/todolist" element={<TodoList/>}/>
      </Routes>
    </>
  );
}


export default Allroutes;