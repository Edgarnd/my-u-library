const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let validatedRoles = {
    values: ['TEACHER_ROLE', 'STUDENT_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'STUDENT_ROLE',
        enum: validatedRoles
    },
    status: {
        type: Boolean,
        required: true
    },
    google: {
        type: Boolean,
        required: true
    }
});
/*
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}*/

module.exports = mongoose.model('User', userSchema);