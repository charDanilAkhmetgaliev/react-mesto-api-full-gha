const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { schemaParamCardId, schemaBodyCards } = require('../scripts/utils/clbSchemas');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: schemaBodyCards,
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: schemaParamCardId,
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: schemaParamCardId,
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: schemaParamCardId,
}), dislikeCard);

module.exports = cardsRouter;
