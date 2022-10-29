
const userSchema = new Schema({
    identifier: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
});

module.exports = model("User", userSchema);