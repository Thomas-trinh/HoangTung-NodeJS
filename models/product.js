var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpkt:rDDra8qqSuEH2khW@cluster0.jxojykg.mongodb.net/test';
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
    comment: [{}]
})

module.exports = mongoose.model('Product', ProductSchema);