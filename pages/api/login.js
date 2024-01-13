import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken')


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ 'email': req.body.email })
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedPass = (bytes.toString(CryptoJS.enc.Utf8));
        if (user) {
            if (req.body.email === user.email && req.body.password == decryptedPass) {
                var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "2d" })
                res.status(200).json({ success: true, token, email: user.email })
            }
            else {
                res.status(200).json({ success: false, error: "Invalid Credentials" })
            }
        }
        else {
            res.status(200).json({ success: false, error: "User Not found!" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);