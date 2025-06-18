import React from "react";
import { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";

function AddTodo() {
    const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    tags: "",
    assignedUsers: ""
  });
  const toast = useToast();

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const body = {
        ...todo,
        tags: todo.tags.split(","),
        assignedUsers: todo.assignedUsers.split(",")
      };
      await axios.post("https://todo-list-nsvy.onrender.com/api/todos", body);
      toast({ title: "Todo added", status: "success", duration: 2000, isClosable: true });
      setTodo({ title: "", description: "", priority: "medium", tags: "", assignedUsers: "" });
    } catch (err) {
      toast({ title: "Error adding todo", status: "error" });
    }
  };
  return (
    <>
    <Box maxW="md" mx="auto" mt={10}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={todo.title} onChange={handleChange} />
        <FormLabel>Description</FormLabel>
        <Input name="description" value={todo.description} onChange={handleChange} />
        <FormLabel>Priority</FormLabel>
        <Select name="priority" value={todo.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <FormLabel>Tags (comma separated)</FormLabel>
        <Input name="tags" value={todo.tags} onChange={handleChange} />
        <FormLabel>Assigned Users (comma separated emails)</FormLabel>
        <Input name="assignedUsers" value={todo.assignedUsers} onChange={handleChange} />
        <Button mt={6} colorScheme="blue" onClick={handleSubmit}>Add Todo</Button>
      </FormControl>
    </Box>
    </>
  );
}

export default AddTodo;