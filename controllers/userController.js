const {User, Thought} = require('../models');
const thoughtController = require('./thoughtController');

const userController = { 


  // get all users
getAllUsers(req, res) {
  User.find({})
  .then((Users) => res.json(Users))
  .catch((err) => {
    console.error({ message: err });
    return res.status(500).json(err);
  });
},


getUserbyId(req, res) {
  User.findOne({ _id: req.params.userId })
  .populate({
    path: 'Thoughts',
    select: '-__v'
  })
  .populate({
    path: 'Friends',
    select: '-__v'
  })
  .then((User) => 
    !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      )
  .catch((err) => {
    console.error({ message: err });
    return res.status(500).json(err);
  });
},


createUser(req, res) {
  User.create(req.body)
  .then((User) => res.json(User)) 
  .catch((err) => res.status(500).json(err));
},


updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    update,
    { new: true }
  )
  .then((User) => 
    !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      ) 
  .catch((err) => res.status(500).json(err));
},


deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
  .then((User) => 
    !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      ) 
  .catch((err) => res.status(500).json(err));
},


addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { Friends: req.params.friendId } },
    { new: true }
  )
  .then((User) =>
    !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      )
  .catch((err) => res.status(500).json(err));
},


deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { Friends: req.params.friendId } },
    { new: true }
  )
  .then((User) =>
    !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      )
  .catch((err) => res.status(500).json(err));  
}
};
