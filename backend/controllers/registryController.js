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

    getLastTenFromRegistry: async (req, res) => {

        const registry = await Registry.find().limit(10).sort({$natural:-1})

        res.json({
            success: true,
            registry
        })
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

    removeDataFromRegistry: async (req, res) => {

        const id = req.params.id;

        await Registry.findOneAndDelete({ _id: id });

        res.json({ success: true });
    },

    ModifyDataFromRegistry: async (req, res) => {

        await findToModify(req.body.concept, req.body.amount, req.params.id)
        
        async function findToModify(concept, amount, id) {
            if(concept !== undefined) {
                await Registry.findByIdAndUpdate( id, { concept: concept } ,
                    function (err) {
                        if (err) { 
                            res.json({ success: false });
                        } else res.json({ success: true });
                    }
                );
            } else {
                await Registry.findByIdAndUpdate( id, { amount: amount } ,
                    function (err) {
                        if (err) { 
                            res.json({ success: false });
                        } else res.json({ success: true });
                    }
                );
            } 
        }
    }
};

module.exports = registryController;
