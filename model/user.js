const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
     userName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
     hash_password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String
    }
}, { timestamps: true })


userSchema.method({
async authenticate(password) {
    const result = await bcrypt.compare(password, this.hash_password);
    return result;
},
});

userSchema.statics.getUserByIds = async function (ids) {
    try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
    } catch (error) {
    throw error;
    }
}

module.exports = mongoose.model("User", userSchema);