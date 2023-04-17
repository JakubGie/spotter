const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const spottedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Spotted = mongoose.model('Spotted', spottedSchema)

module.exports = Spotted