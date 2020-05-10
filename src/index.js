//calling express app.js file (loading locally created app module)
const app = require('./app')

// a port on which express server will run 
//process.env.PORT is used by domain to specify port for express server
const port = process.env.PORT || 3000

//app.listen() starts over server on specified port
app.listen(port,()=>{
    console.log(`Server is running on ${port}!`)
})