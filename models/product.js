var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://Thomas-trinh:Thomas-456@cluster0.rkjr8qq.mongodb.net/test';
mongoose.connect(mongoDB);

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    category: {type:ObjectId, ref: 'Category'},
    comment: [{type:ObjectId, ref: 'Comment'}]
})

module.exports = mongoose.model('Product', ProductSchema);