const path = require('path');
const multer = require('multer');


let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/images/users'))
    },
    filename: (req, file, callback) => {
        callback (null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

const uploadFileRegister = multer({ storage});




module.exports = uploadFileRegister