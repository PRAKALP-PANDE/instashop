// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    "445304": ["Wani", "Maharashtra"],
    "721302": ["Kharagpur", "West Bengal"],
    "110003": ["Delhi", "Delhi"],
    "560017": ["Bangalore", "Karnataka"],
  }
  res.status(200).json(pincodes)
}
