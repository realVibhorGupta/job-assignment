const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    displayName: {
        type: String,
        required: [true, 'Display Name is required'],
    },
    name: {
        first: { type: String, required: [true, 'First Name is required'] },
        last: { type: String, required: [true, 'Last Name is required'] },
    },
    nickname: {
        type: String,
    },
    website: {
        type: String,
        match: [/^https?:\/\//, 'Please use a valid URL'],
    },
    jabber: { type: String },
    aolIM: { type: String },
    yahooIM: { type: String },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;