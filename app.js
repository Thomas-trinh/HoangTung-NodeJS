const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const URL = "mongodb+srv://phongpkt:rDDra8qqSuEH2khW@cluster0.jxojykg.mongodb.net/test";

const productModel = require('./models/product');
const catModel = require('./models/category');

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))


//connect to Db
mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.log("error", error);
    })


//duong dan trang index
app.get('/', async (req, res) => {
    const product = await productModel.find().populate('category');
    res.render('index', {'products' : product})
})

//get create product
app.get('/createProduct', async (req, res) => {
    const cat = await catModel.find();
    res.render('products/create-product', {'category' : cat})
})
//post create product
app.post('/createProduct', async (req, res) => {
    const name = req.body.name
    const picture = req.body.picture
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    
    const product = new productModel({'name':name,'price':price, 'description': description, 'picture':picture, 'category':category})
    product.save()

    await catModel.findById(category)
    .updateOne
    ({
        $push:{products:product.id}
    })
    res.redirect('/')
})

//get edit product
app.get('/editProduct?:id', async (req, res) => {
    const id = req.query.id
    var product = await productModel.findById(id)
    res.render('products/edit-product', {'product': product})
})
//post edit product
app.post('/editProduct?:id', async (req, res) => {
    const id = req.body.id
    const name = req.body.txtName
    const picture = req.body.picture
    const price = req.body.price
    const description = req.body.description

    try{
        const product = await productModel.findById(id)
        product.name = name
        product.picture = picture
        product.price = price
        product.description = description
        product.save()
        console.log("update successfully")
        res.redirect('/')
    } catch (error){
        console.log(error)
    }
})

//product detail
app.get('/viewProduct?:id', async(req, res) => {
    const id = req.query.id
    const product = await productModel.findById(id)
    res.render('products/view-product', {'products': product})
})
//delete product
app.get('/deleteProduct?:id', async (req, res) => {
    const id = req.query.id
    await productModel.deleteOne({'_id' : id})
    res.redirect('/')
})


//------------------------------Category index------------------------------
app.get('/viewCategory', async (req, res) => {
    const cat = await catModel.find().populate('products');
    res.render('categories/view-category', {'categories' : cat})
})

app.get('/createCategory', (req, res) => {
    res.render('categories/create-category')
})
app.post('/createCategory', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const category = new catModel({'name':name,'description': description})
    category.save()
    res.redirect('/')
})

app.get('/editCategory?:id', async (req, res) => {
    const id = req.query.id
    var category = await catModel.findById(id)
    res.render('categories/edit-category', {'categories': category})
})
app.post('/editCategory?:id', async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const description = req.body.description

    try{
        const category = await catModel.findById(id)
        category.name = name
        category.description = description
        category.save()
        console.log("update successfully")
        res.redirect('/')
    } catch (error){
        console.log(error)
    }
})

app.get('/deleteCategory?:id', async (req, res) => {
    const id = req.query.id
    await catModel.deleteOne({'_id' : id})
    res.redirect('/')
})

//duong dan den trang localhost
app.listen(port, () => {
    console.log('localhost:5000')
})