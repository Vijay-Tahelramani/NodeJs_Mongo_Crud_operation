const mongoose = require('mongoose')

//Connecting to mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/userdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})