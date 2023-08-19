/* eslint-disable linebreak-style */
const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  changeUser,
  changeAvatar,
  getMyProfile,
} = require('../controllers/users');

const { validateId, validateProfile, validateAvatar } = require('../middlewares/validation');

usersRouter.route('/').get(getUsers);
usersRouter.get('/me', getMyProfile);
usersRouter.get('/:userId', validateId, getUser);

usersRouter.patch('/me', validateProfile, changeUser);

usersRouter.patch('/me/avatar', validateAvatar, changeAvatar);

module.exports = usersRouter;
