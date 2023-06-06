'use strict'
const pusher = require('../pusher')
const { Playground, Profile } = require('../models')

async function getAllPlaygrounds(req, res) {
  try {
    const playgrounds = await Playground.findAll({
      where: { profileId: req.user.profile.id },
      include: { model: Profile, as: 'profile', attributes: ['id', 'name'] }
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
      where: { id: req.params.id, profileId: req.user.profile.id }
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
    const playground = await Playground.create({ ...req.body, profileId: req.user.profile.id })
    pusher.trigger('playground', 'created', playground)
    res.status(201).json(playground)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updatePlayground(req, res) {
  try {
    const playground = await Playground.findOne({
      where: { id: req.params.id, profileId: req.user.profile.id }
    })
    if (!playground) return res.status(404).json({ message: 'Playground not found' })

    const updatedPlayground = await playground.update(req.body)
    pusher.trigger('playground', 'updated', updatedPlayground)
    res.json(updatedPlayground)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deletePlayground(req, res) {
  try {
    const playground = await Playground.findOne({
      where: { id: req.params.id, profileId: req.user.profile.id }
    })
    if (!playground) return res.status(404).json({ message: 'Playground not found' })
    await playground.destroy()
    pusher.trigger('playground', 'deleted', { id: req.params.id })
    res.json({ message: 'Playground deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { 
  getAllPlaygrounds, 
  getPlayground, 
  createPlayground, 
  updatePlayground, 
  deletePlayground 
}
