const https = require('https');
const PaytmChecksum = require('paytmChecksum');
import Order from "../../models/Order"
import Product from "@/models/Product";
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === 'POST') {

        // Check if the cart is tampered with --- [Pending]
        let product, sumTotal = 0;
        let cart = req.body.cart;
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some items in you cart have changed. Please try again" })
                return
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, "error": "The price of some items in you cart have changed. Please try again" })
            return
        }

        // Check if the cart items are out of stock -- [Pending]

        // Check if the details are valid -- [Pending]

        //Initiate an order corresponding to this order id
        let order = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart,
        })
        await order.save()

        // Insert an entry in the Orders table with status as pending
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);


        const requestAsync = () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId={req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let ress = JSON.parse(response).body
                        ress.success = true
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }

        let myr = await requestAsync()
        res.status(200).json(myr)

    }
}

export default connectDb(handler);
