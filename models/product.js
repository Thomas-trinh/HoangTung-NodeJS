var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpkt:rDDra8qqSuEH2khW@cluster0.jxojykg.mongodb.net/test';
mongoose.connect(mongoDB);
var db = mongoose.connection;

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
})

module.exports = mongoose.model('Product', ProductSchema);