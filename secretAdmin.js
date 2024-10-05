const crypto=require('crypto')
const genSec=crypto.randomBytes(64).toString('hex')
console.log(genSec)

const prductsDelete=[]
let favorites=[
    [
        {product:'hamza',delete:true},
        {product:'imade',delete:false},
        {product:'anas',delete:true},
    ],
    [
        {product:'yassine',delete:false},
        {product:'khadija',delete:false},
        {product:'kamal',delete:true},
    ],
    [
        {product:'nezha',delete:false},
        {product:'sanaa',delete:true},
        {product:'youssef',delete:true},
    ],
    [
        {product:'hassan',delete:false},
        {product:'lamya',delete:false},
        {product:'ayoub',delete:true},
    ],
    [
        {product:'ghite',delete:true},
        {product:'kamara',delete:true},
    ],
    [
        {product:'nezar',delete:true},
        {product:'samir',delete:true},
    ],
]

.forEach( customerFavor => customerFavor.forEach(ele=> ele.delete===true? prductsDelete.push(ele.product):''  )  )

console.log(prductsDelete)

// [
//     [
//       { product: 'hamza', delete: true },
//       { product: 'anas', delete: true }
//     ],
//     [ { product: 'kamal', delete: true } ],
//     [
//       { product: 'sanaa', delete: true },
//       { product: 'youssef', delete: true }
//     ],
//     [ { product: 'ayoub', delete: true } ],
//     [
//       { product: 'ghite', delete: true },
//       { product: 'kamara', delete: true }
//     ],
//     [
//       { product: 'nezar', delete: true },
//       { product: 'samir', delete: true }
//     ]
//   ]