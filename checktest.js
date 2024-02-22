/* import checksum generation utility */
const checksum_lib = require("paytmChecksum");

var paytmChecksum = "";

var paytmParams = {}

const received_data = JSON.parse(`{}`);
for (var key in received_data) {
    if (key == 'CHECKSUMHASH') {
        paytmChecksum = received_data[key];
    } else {
        paytmParams[key] = received_data[key];
    }
}

/* string we need to verify against checksum */

var isValidChecksum = checksum_lib.verifySignature(paytmParams, "", paytmChecksum);
if (isValidChecksum) {
    console.log("Checksum Matched");
} else {
    console.log("Checksum Mismatched");
}