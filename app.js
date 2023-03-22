const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const URL = "mongodb+srv://phongpkt:rDDra8qqSuEH2khW@cluster0.jxojykg.mongodb.net/test";

const productModel = require('./models/product');

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))


//connect to Db
mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("err", err);
    })


//duong dan trang index
app.get('/', async (req, res) => {
    const product = await productModel.find();
    res.render('index', {'products' : product})
})

app.get('/createProduct', (req, res) => {
    res.render('create-product')
})
app.post('/createProduct', (req, res) => {
    const name = req.body.name
    const picture = req.body.picture
    const price = req.body.price
    const description = req.body.description

    const product = new productModel({'name':name,'price':price, 'description': description, 'picture':picture})
    product.save()
    res.redirect('/')
})
app.get('/editProduct', async (req, res) => {
    const id = req.query.id
    const product = await productModel.findById(id)
    res.render('edit-product', {'product': product})
})
//product detail (1)
app.get('/viewProduct/:id', async(req, res) => {
    const id = req.query.id
    const product = await productModel.findById(id)
    res.render('view-product', {'product': product})
})
app.get('/deleteProduct', async (req, res) => {
    const id = req.query.id
    const product = await productModel.deleteOne(id)
    res.redirect('/')
})

//duong dan den trang localhost
app.listen(port, () => {
    console.log('localhost:5000')
})