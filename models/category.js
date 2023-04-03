var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpkt:rDDra8qqSuEH2khW@cluster0.jxojykg.mongodb.net/test';
mongoose.connect(mongoDB);

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    products: [{type:ObjectId, ref:'Product'}] //khai bao array
})

module.exports = mongoose.model('Category', CategorySchema)