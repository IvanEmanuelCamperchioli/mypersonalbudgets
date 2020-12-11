const express = require('express');
const routes = express.Router();

const registryController = require('../controllers/registryController');


// provide and get from registry
routes.route('/registry')
      .get(registryController.getRegistry)
      .post(registryController.loadRegister);

// delete data
routes.route('/registry/:id')
      .delete(registryController.removeDataOfRegistry)
      
// Modifications
routes.route('/modify/concept/:id')
      .put(registryController.ModifyConceptOfRegistry);

routes.route('/modify/amount/:id')
      .put(registryController.ModifyAmountOfRegistry);


module.exports = routes;