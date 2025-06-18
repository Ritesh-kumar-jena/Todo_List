import React from "react";
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";

function AddUser() {
    const [form, setForm] = useState({ name: "", email: "" });
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://todo-list-nsvy.onrender.com/api/users", form);
      toast({ title: "User added", status: "success", duration: 2000, isClosable: true });
      setForm({ name: "", email: "" });
    } catch (err) {
      toast({ title: "Error adding user", status: "error" });
    }
}
  return (
    <>
      <Box maxW="md" mx="auto" mt={10}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={form.name} onChange={handleChange} />
        <FormLabel mt={4}>Email</FormLabel>
        <Input name="email" value={form.email} onChange={handleChange} />
        <Button mt={6} colorScheme="teal" onClick={handleSubmit}>Add User</Button>
      </FormControl>
    </Box>
    </>
  );
}

export default AddUser;