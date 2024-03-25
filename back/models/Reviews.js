const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    title: {
        type: String, 
        required: true
    },
    description: {
    type: String, 
    default: "user"
},
rating: {
    type: String,
    required: true
}


})

module.exports = mongoose.model("Review", reviewSchema)