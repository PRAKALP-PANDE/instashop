const mongoose = require('mongoose');

const ForgotSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    token: { type: String, required: true },
    
}, { timestamps: true });
// mongoose.models = {}
// export default mongoose.model("User", UserSchema);
export default mongoose.models.User || mongoose.model("Forgot", ForgotSchema);
