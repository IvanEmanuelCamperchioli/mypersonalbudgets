const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log("database connected"))
.catch(error => console.log(error));