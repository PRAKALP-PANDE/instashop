import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
import cryptoJs from "crypto-js"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        const bytes = cryptoJs.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString(cryptoJs.enc.Utf8);
        // Showpass
        // console.log(decryptedPass);
        if (decryptedPass == req.body.password && req.body.npassword == req.body.cpassword) {
            await User.findOneAndUpdate({ email: user.email }, { password: cryptoJs.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString() })
            res.status(200).json({ success: true })
            return
        }
        res.status(200).json({ success: false })
    }
    else {
        res.status(400).json({ error: "error" })
    }

}
export default connectDb(handler);