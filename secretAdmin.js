const crypto=require('crypto')
const genSec=crypto.randomBytes(64).toString('hex')
console.log(genSec)



