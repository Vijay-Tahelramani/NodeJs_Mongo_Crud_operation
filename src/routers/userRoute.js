const express = require('express')
const User = require('../models/user')
const router = new express.Router()


//Post Method for creating user
router.post('/signUp', async (req, res) => {
    
    const user = new User(req.body)

    //performing asynchronous task using async await (can also use promises or callback methods)
    try {
        await user.save()

        //sending response in json fromat 
        res.status(201).send({user,message: "User created successfully!"})
    } catch (e) {

        //Handling errors
        if(e.name === "ValidationError"){
            res.send({
                error:true,
                message: 'Required fields are missing or may have an incorrect value!!'
            })
        }
        else if(e.name === "MongoError" && e.code === 11000){
            res.send({
                error:true,
                message: 'Email already Exists!!'
            })
        }
        else{
            res.send({
                error:true,
                message: 'Something went wrong!!'
            })
        }   
    }
})

//Get Method for fetching all users
router.get('/usersList',async (req,res) =>{

    const sort = {}
    const search = {}

    // specifying search values if any
    if(req.query.firstName){
        search.firstName = new RegExp(`^${req.query.firstName}$`, 'i')
    }
    // specifying sort params if any
    if(req.query.sortBy){
        sort[req.query.sortBy] = 1
    }
    
    try {
        const users = await User.find(search).sort(sort)

        if (!users) {
            return res.status(404).send()
        }

        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

})


// Patch Method for updating users
router.patch('/userUpdate/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName','email','dateOfBirth','shortBio']

    //checking req.body contains only valid keys for updating record
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ 
            error: true,
            message: 'Invalid updates!' })
    }

    try {
        const user = await User.findOne({ _id: req.params.id})

        if (!user) {
            return res.status(404).send({
                error: true,
                message: 'User not found!'
            })
        }

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send({user,message:'User updated successfully!!'})
    } catch (e) {
        //Handling errors
        if(e.name === "ValidationError"){
            res.send({
                error:true,
                message: 'Required fields are missing or may have an incorrect value!!'
            })
        }
        else if(e.name === "MongoError" && e.code === 11000){
            res.send({
                error:true,
                message: 'Email already Exists!!'
            })
        }
        else{
            res.send({
                error:true,
                message: 'Something went wrong!!'
            })
        }   
    }
})

// Delete Method for deleting users
router.delete('/userDelete',async (req,res)=>{

    try {
        
        const user = await User.findOneAndDelete({ _id: req.query.id})
        if (!user) {
            res.send({
                error:true,
                message: 'User not Found!!'
            })
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router