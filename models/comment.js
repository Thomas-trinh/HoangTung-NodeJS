var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://Thomas-trinh:Thomas-456@cluster0.rkjr8qq.mongodb.net/test';
mongoose.connect(mongoDB);

const CommentSchema = new Schema({
    Publisher: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    products: {type:ObjectId, ref:'Product'} 
})

module.exports = mongoose.model('Comment', CommentSchema)