// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order"
import Product from "@/models/Product";
import PaytmChecksum from "paytmchecksum";
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
  let order;

  var paytmChecksum = "";
  var paytmParams = {}

  const received_data = req.body
  for (var key in received_data) {
    if (key == 'CHECKSUMHASH') {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }
  var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
  if (!isValidChecksum) {
    res.status(500).send("Some error occured")
    return
  }

  // Validate paytm checksum
  // Update status into Orders table after checking the transaction status
  if (req.body.STATUS == 'TXN_SUCCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID })
    // Out of stock
    let products = order.products
    for (let slug in products) {
      await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
    }

  }
  else if (req.body.STATUS == 'PENDING') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Pending', paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID })
  }
  // Initiate Shipping
  // Redirect user to the order confirmation page
  res.redirect('/order?clearCart=1&id=' + order._id, 200)
  // res.status(200).json({ body: req.body })
}

export default connectDb(handler);