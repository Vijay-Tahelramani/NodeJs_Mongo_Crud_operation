const mongoose = require('mongoose')
const validator = require('validator')

//mongoose Schema allows us to validate data and keep data in structured form
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid') // performing custom validations
            }
        }
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    shortBio:{
        type: String,
        required: true,
        trim: true
    }
})

//creating a model which will be used for creating and reading data from monogdb database
const User = mongoose.model('User', userSchema)

module.exports = User