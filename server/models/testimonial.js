const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let socialNetworksValidate = {
    values: ['FB', 'IG', 'GO'],
    message: '{VALUE} no es una red social válida'
};

let testimonialSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    socialId: {
        type: String,
        unique: true,
        required: true,
    },
    socialNetwork: {
        type: String,
        required: true,
        default: 'FB',
        enum: socialNetworksValidate
    },
    urlPicture: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);