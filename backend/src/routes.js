const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

//Session
routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  SessionController.create
);

// Ongs
routes.get('/ongs', OngController.index);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(3),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .length(11),
      city: Joi.string()
        .required()
        .min(3),
      uf: Joi.string()
        .required()
        .length(2),
    }),
  }),
  OngController.create
);

// Ong's incident by Ong_id
routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

// Incidents
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.string(),
    }),
  }),
  IncidentController.index
);
routes.post('/incidents', IncidentController.create);
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete
);

module.exports = routes;
