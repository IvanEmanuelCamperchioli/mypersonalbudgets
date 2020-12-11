const Registry = require('../models/Registry');

const registryController = {

    // GET
    getRegistry: async (req, res) => {

        const registry = await Registry.find();

        res.json({
            success: true,
            registry
        });
    },

    // POST
    loadRegister: async (req, res) => {

        const { type, concept, amount, date } = req.body;

        const newRegistry = new Registry({
            type,
            concept,
            amount,
            date
        });

        newRegistry.save()
            .then(registry => {
                res.json({ success: true, registry })
            })
            .catch(error => {
                res.json({ success: false, error })
            });
    },

    removeDataOfRegistry: async (req, res) => {

        const id = req.params.id;

        await Registry.findOneAndDelete({ _id: id });

        res.json({ success: true });
    },

    ModifyConceptOfRegistry: async (req, res) => {

        await Registry.findByIdAndUpdate(
            req.params.id,
            { concept: req.body.concept },
            function (err) {
                if (err) {
                    res.json({ success: false });
                } else {
                    res.json({ success: true });
                };
            }
        );
    },

    ModifyAmountOfRegistry: async (req, res) => {

        await Registry.findByIdAndUpdate(
            req.params.id, 
            { amount: req.body.amount }, 
            function (err) {
                if (err) {
                    res.json({ success: false });
                } else {
                    res.json({ success: true });
                };
            }
        );
    }
};

module.exports = registryController;
