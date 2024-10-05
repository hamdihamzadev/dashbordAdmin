const multer = require("multer")

const MIME_TYPES={
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png',
}

const storage= multer.diskStorage({
    destination :(req,file,callback)=>{
        callback(null, 'images')
    } ,
    filename:(req,file,callback)=>{
        const extension=MIME_TYPES[file.mimetype]
        const uniqueSuffix=Date.now()+ '-' + Math.round(Math.random() * 1E9)
        callback(null, file.filename + '-' + uniqueSuffix + '.'+extension )
    }
})

module.exports=multer({storage:storage}).single('image')