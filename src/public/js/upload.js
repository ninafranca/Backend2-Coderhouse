import multer from "multer";
import __dirname from "../../utils.js";

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        if (file.fieldname === "image" || file.fieldname === "register-user-avatar") {
            cb(null, "public/images") 
        } else if (file.fieldname === "document") {
            cb(null, "public/documents") 
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage:storage});

export default upload