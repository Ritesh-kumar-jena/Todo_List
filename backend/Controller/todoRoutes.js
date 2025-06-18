const express = require("express");
const { todo } = require("../Model/todoModel");

const todoRoutes = express.Router();

todoRoutes.post("/todos", async (req, res) => {
  try {
    const { title, description, priority, tags, assignedUsers, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ msg: "Title and userId are required." });
    }

    const newTodo = new todo({
      title,
      description,
      priority,
      tags,
      assignedUsers,
      user: userId
    });

    await newTodo.save();
    res.status(201).json({ msg: "Todo created successfully", todo: newTodo });

  } catch (error) {
    res.status(500).json({ msg: "Failed to create todo", error: error.message });
  }
});

todoRoutes.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch todos", error: error.message });
  }
});

todoRoutes.get("/todos/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await todo.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch todos", error: error.message });
  }
});


todoRoutes.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data=req.body
    const updated = await todo.findByIdAndUpdate({_id:id ,new: true},data);
    res.status(200).json({ msg: "Todo updated", todo: updated });
  } catch (error) {
    res.status(500).json({ msg: "Update failed", error: error.message });
  }
});


todoRoutes.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todo.findByIdAndDelete({_id:id});
    res.status(200).json({ msg: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Delete failed", error: error.message });
  }
});

todoRoutes.get("/todos", async (req, res) => {
  try {
    const {
      userId,
      tag,
      priority,
      completed,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10
    } = req.query;

    const query = {};
    if (userId) query.user = userId;
    if (tag) query.tags = tag;
    if (priority) query.priority = priority;
    if (completed !== undefined) query.completed = completed === "true";

    const sortOrder = order === "asc" ? 1 : -1;

    const todos = await todo
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await todo.countDocuments(query);

    res.status(200).send({
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalCount,
      todos
    });

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


todoRoutes.patch("/todos/:id/notes", async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    if (!content) {
      return res.status(400).json({ msg: "Note content is required." });
    }

    const updatedTodo = await todo.findByIdAndUpdate(
      {_id:id},
      { $push: { notes: { content } } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ msg: "Note added", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ msg: "Failed to add note", error: error.message });
  }
});



module.exports = { todoRoutes };
