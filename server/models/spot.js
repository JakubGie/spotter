const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const spotSchema = new Schema({
    spotted: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {

    }
}, { timestamps: true })

const Spot = mongoose.model('Spot', spotSchema)

module.exports = Spot