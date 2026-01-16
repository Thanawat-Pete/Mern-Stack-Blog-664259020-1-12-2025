const multer = require("multer")
const path = require("path");
const firebaseConfig = require("../config/firebase.config")

const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");

// initalize Firebase Storage
const { initializeApp } = require("firebase/app");
const { emitWarning } = require("process");
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

//set Storage Engine
const upload = multer({
    storage: multer.memoryStorage({}),
    limits:{fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("file");

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

//Upload to firebase
async function uploadToFirebase(req, res, next) {
    if (!req.cover) {
        next();
        return;
    }
    //save location
    const storageRef = ref(firebaseStorage, `upload/${req.cover.originalname}`);

    const metadata = {
        contentType: req.cover.mimetype,
    };
    try {
        const snapshot = await uploadBytesResumble(storageRef, req.cover.buffer, metadata);
        req.cover.firebaseUrl = await getDownloadURL(snapshort.ref)
        next();
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong while upload to filebase"})
    }
}

module.exports = fileMiddleware;