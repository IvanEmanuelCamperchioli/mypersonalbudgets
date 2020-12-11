const mongoose = require('mongoose');

const registrySchema = new mongoose.Schema({
    type: {type: String, required: true},
    concept: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: String, required: true}
});

const Registry = mongoose.model('registry', registrySchema);

module.exports = Registry;