const Employee = require("../models/employee.model");

const sendError = (res, err) => {
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
};

exports.getAll = async (req, res) => {
  try {
    const rows = await Employee.findAll();
    return res.json(rows);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const emp = await Employee.findById(id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    return res.json(emp);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.create = async (req, res) => {
  try {
    const payload = req.body;
    const created = await Employee.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const exists = await Employee.findById(id);
    if (!exists) return res.status(404).json({ error: "Employee not found" });
    const updated = await Employee.update(id, req.body);
    return res.json(updated);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Employee.remove(id);
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    return sendError(res, err);
  }
};

exports.removeAll = async (req, res) => {
  try {
    await Employee.removeAll();
    return res.json({ message: "All employees deleted" });
  } catch (err) {
    return sendError(res, err);
  }
};
