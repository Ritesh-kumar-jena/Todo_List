import React from "react";
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";

function AddNote() {
    const [todoId, setTodoId] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios.patch(`https://todo-list-nsvy.onrender.com/todos/${todoId}/api/notes`, { content });
      toast({ title: "Note added", status: "success", duration: 2000, isClosable: true });
      setTodoId("");
      setContent("");
    } catch (err) {
      toast({ title: "Error adding note", status: "error" });
    }
  };
  return (
    <>
       <Box maxW="md" mx="auto" mt={10}>
      <FormControl>
        <FormLabel>Todo ID</FormLabel>
        <Input value={todoId} onChange={(e) => setTodoId(e.target.value)} />
        <FormLabel mt={4}>Note Content</FormLabel>
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
        <Button mt={6} colorScheme="green" onClick={handleSubmit}>Add Note</Button>
      </FormControl>
    </Box>
    </>
  );
}

export default AddNote;