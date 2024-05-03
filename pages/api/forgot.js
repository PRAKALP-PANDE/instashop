// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "@/models/Forgot"
import User from "@/models/User"
export default async function handler(req, res) {

    if (req.body.sendMail) {

        let token = `9922015121`
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })

        let email = `We hace sent you this email in response to your request to reet your password on instashop.com
    
    To reset your password, plwase follow the link below:
    
    <a href="https://instashop.com/forgot?token=#{token}"> Click here to reset your password</a>
    
    <br/><br/>
    
    We recommend that you keep your password secure and not share it with anyonhe. If you feel your password has been cpmpromissed, you can change it by going to your My Account Page and change you password.
    
    <br/> <br/>`
    }
    else {

        //ToDo reset password

    }
    res.status(200).json({ success: true })
}
