'use strict'

const { Playground, User } = require('../models')

async function getAllPlaygrounds(req, res) {
  try {
    const playgrounds = await Playground.findAll({
      where: { userId: req.user.id },
      include: { model: User, as: 'User', attributes: ['id', 'name', 'email'] }
    })
    res.json(playgrounds)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getPlayground(req, res) {
  try {
    const playground = await Playground.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })
    if (!playground) return res.status(404).json({ message: 'Playground not found' })
    res.json(playground)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createPlayground(req, res) {
  try {
    const playground = await Playground.create({ ...req.body, userId: req.user.id })
    res.status(201).json(playground)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updatePlayground(req, res) {
  try {
    const playground = await Playground.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })
    if (!playground) return res.status(404).json({ message: 'Playground not found' })

    const updatedPlayground = await playground.update(req.body)
    res.json(updatedPlayground)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deletePlayground(req, res) {
  try {
    const playground = await Playground.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })
    if (!playground) return res.status(404).json({ message: 'Playground not found' })

    await playground.destroy()
    res.json({ message: 'Playground deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { getAllPlaygrounds, getPlayground, createPlayground, updatePlayground, deletePlayground }
