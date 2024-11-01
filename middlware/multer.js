const multer = require("multer")

const MIME_TYPES={
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png',
    'image/webp': 'webp'
}

const storage= multer.diskStorage({
    destination :(req,file,callback)=>{
        callback(null, 'images')
    } ,
    filename:(req,file,callback)=>{
        const extension=MIME_TYPES[file.mimetype]
        const uniqueSuffix=Date.now()+ '-' + Math.round(Math.random() * 1E9)
        callback(null,file.originalname.split('.').filter(ele=>ele!=='png').join('') + '-' + uniqueSuffix + '.'+extension )
    }
})

const uploadSingle = multer({ storage: storage }).single('img');

// Middleware pour plusieurs fichiers
const uploadMultiple = multer({ storage: storage }).array('imgs');

// Exporter les deux middlewares dans un objet
module.exports = {
    uploadSingle,
    uploadMultiple
};

