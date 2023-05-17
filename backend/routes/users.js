const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaBodyUser, schemaBodyAvatar, schemaParamUserId } = require('../scripts/utils/clbSchemas');
const {
  getUsers, updateData, updateAvatar, getUserData, getUsersById,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserData);

usersRouter.patch('/me', celebrate({
  body: schemaBodyUser,
}), updateData);

usersRouter.patch('/me/avatar', celebrate({
  body: schemaBodyAvatar,
}), updateAvatar);

usersRouter.get('/:id', celebrate({
  params: schemaParamUserId,
}), getUsersById);

module.exports = usersRouter;
