const router = require('express').Router();
const {
  getAllThoughts, 
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;
