import multer from "multer";
import __dirname from "../../utils.js";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./src/public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});

export default upload

// const storage = multer.diskStorage({
//     destination: function (req,file,cb) {
//         if (file.fieldname === "image" || file.fieldname === "register-user-avatar") {
//             cb(null, "public/images") 
//         } else if (file.fieldname === "document") {
//             cb(null, "public/documents") 
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })

// const upload = multer({storage:storage});