import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        const { name, email, address, pincode, phone } = dbuser;
        res.status(200).json({ name, email, address, pincode, phone })
    }
    else {
        res.status(400).json({ error: "error" })
    }

}
export default connectDb(handler);