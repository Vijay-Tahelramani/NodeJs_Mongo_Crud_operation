//loading express core module
const express = require('express') 
require('./db/mongoose') //establishing connection to database
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('hbs')

//creating a route for all user related operations
const userRouter = require('./routers/userRoute')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars are used for displaying dynamic view over html pages
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//serving html files
app.use(express.static(publicDirectoryPath))

//specifying middleware for reading encoded data or json data
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for all user operation routes
app.use(userRouter)


// res.render() serves html files and we can specify dynamic data as object
//Rendering default html page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Pratical Test',
        name:'Vijay Tahelramani'
    })
})

//Rendering html page for creating user
app.get('/create',(req,res)=>{
    res.render('create',{
        title:'Pratical Test',
        name:'Vijay Tahelramani',
        maxDate: new Date().toISOString().split('T')[0]
    })
})

//Rendering html page for viewing users
app.get('/view',(req,res)=>{
    res.render('view',{
        title:'Pratical Test',
        name:'Vijay Tahelramani'
    })
})

//Rendering html page for update 
app.post('/update',(req,res)=>{
    
    res.render('update',{
        title:'Pratical Test',
        name:'Vijay Tahelramani',
        maxDate: new Date().toISOString().split('T')[0],
        id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: new Date(req.body.dateOfBirth).toISOString().split('T')[0],
        shortBio: req.body.shortBio        
    })
})

//For all invalid calls display page not found
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vijay Tahelramani',
        errMsg: 'Page Not Found'
    })
})

module.exports = app