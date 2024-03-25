const Review = require("../models/User")
const User = require("../models/User")

const asyncHandler = require("express-async-handler")

const getAllReviews = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const reviews = await Review.find().lean()

    // If no notes 
    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    
    const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
        const user = await User.findById(review.user).lean().exec()
        return { ...review, username: user.username }
    }))

    res.json(reviewsWithUser)
})

const createNewReview = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Review.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate review' })
    }

    // Create and store the new user 
    const review = await Review.create({ user, title, text })

    if (review) { // Created 
        return res.status(201).json({ message: 'New review created' })
    } else {
        return res.status(400).json({ message: 'Invalid review data received' })
    }

})

const updateReview = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Review not found' })
    }

    // Check for duplicate title
    const duplicate = await Review.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate review title' })
    }

    review.user = user
    review.title = title
    review.text = text
    review.completed = completed

    const updatedReview = await review.save()

    res.json(`'${updatedReview.title}' updated`)
})

const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Review ID required' })
    }

    // Confirm note exists to delete 
    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Review not found' })
    }

    const result = await review.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllReviews,
    createNewReview,
    updateReview,
    deleteReview
}