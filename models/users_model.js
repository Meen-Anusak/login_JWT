var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
}, {
    timestamps: true,
});

const User = mongoose.model('users', UserSchema);

module.exports = User;


module.exports.Register = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparepassword = async(password, hash, ) => {
    const compare = await bcrypt.compare(password, hash);
    return compare
}