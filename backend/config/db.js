const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log("database connected"))
.catch(error => console.log(error));