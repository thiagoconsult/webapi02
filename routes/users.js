const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.findUsers());
})

router.post('/', (req, res) => {
  const user = req.body;
  res.status(201).json(db.insertUser(user));
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  res.json(db.findUser(id));
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  res.json(db.deleteUser(id));
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let user = req.body;
  res.json(db.updateUser(id, user));
})

module.exports = router;
