const express = require('express')
const path = require('path')
const fs = require('fs');
const { log } = require('console');
const app = express();
const port = 80;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

mongoose.connect("mongodb://localhost/contactDance")

//Define mongoose Schema 
const contactSchema = new mongoose.Schema({
     name: String,
    phone:String,
    email:String,
    address:String
     });

//Define mongoose Model
    var Contact = mongoose.model('Contact', contactSchema)


//express
app.use("/static", express.static('static'))
app.use(express.urlencoded());
// app.use(bodyParser.json())



//post Request
app.post("/contact",(req,res)=>
{
    //saving data to db 
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.redirect("/")
    }).catch((e)=>{
        console.log(e);
        res.status(400)
    })

    
})


//pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.listen(port, () => {
    console.log(`running on port ${port}`);
})


