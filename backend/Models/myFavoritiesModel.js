//this model holds the id of the favorite item, user id and date of creation

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
