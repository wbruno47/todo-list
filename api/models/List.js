const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    data: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }]
})



const List = mongoose.model("List", ListSchema);

module.exports = List; 