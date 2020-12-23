const express = require('express');
const routes = express.Router();

const registryController = require('../controllers/registryController');


// provide and get from registry
routes.route('/registry')
.get(registryController.getRegistry)
.post(registryController.loadRegister);

routes.route('/registry/last_ten')
.get(registryController.getLastTenFromRegistry)

// delete data
routes.route('/registry/:id')
.delete(registryController.removeDataFromRegistry)
      
// Modifications
routes.route('/modify/:id')
.put(registryController.ModifyDataFromRegistry);


module.exports = routes;