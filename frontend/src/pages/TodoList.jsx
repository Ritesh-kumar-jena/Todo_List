import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Tag,
  Badge,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://todo-list-nsvy.onrender.com/api/todos");
      console.log("Fetched todos:", res.data); 
      setTodos(res.data.todos); 
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <Spinner size="xl" mt={10} color="blue.500" />;

  return (
    <Box maxW="4xl" mx="auto" mt={10}>
      <Heading mb={6}>Todo List</Heading>
      <VStack spacing={6} align="stretch">
        {todos.map((todo) => (
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            key={todo._id}
            borderRadius="md"
          >
            <Heading fontSize="xl">{todo.title}</Heading>
            <Text mt={2}>{todo.description}</Text>
            <Text mt={2}>
              <strong>Priority:</strong>{" "}
              <Badge colorScheme="purple">{todo.priority}</Badge>
            </Text>
            <Text mt={2}>
              <strong>Tags:</strong>{" "}
              {todo.tags?.map((tag) => (
                <Tag key={tag} mr={1}>
                  {tag}
                </Tag>
              ))}
            </Text>
            <Text mt={2}>
              <strong>Assigned:</strong>{" "}
              {todo.assignedUsers?.join(", ") || "Unassigned"}
            </Text>
            <Text mt={2}>
              <strong>Notes:</strong>
            </Text>
            {todo.notes?.length > 0 ? (
              todo.notes.map((note, i) => (
                <Text key={i} fontSize="sm" pl={2}>
                  - {note.content}
                </Text>
              ))
            ) : (
              <Text pl={2} fontSize="sm" color="gray.500">
                No notes added.
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default TodoList;
