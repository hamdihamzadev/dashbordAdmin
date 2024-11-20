const crypto=require('crypto')
const GenSec=crypto.randomBytes(64).toString('hex')
console.log(GenSec)