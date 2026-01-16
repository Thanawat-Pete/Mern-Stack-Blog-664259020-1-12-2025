const multer = require("multer")
const path = require("path");
const supabase = require("../config/supabase")

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

//Upload to Supabase
async function uploadToSupabase(req, res, next) {
    if (!req.file) {
        next();
        return;
    }
    //save location
    const filePath = `upload/${req.file.originalname}`;

    try {
        const { data, error } = await supabase.storage.from('uploads').upload(filePath, req.file.buffer, {
            contentType: req.file.mimetype,
        });

        if (error) {
            throw error;
        }

        const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
        req.file.supabaseUrl = urlData.publicUrl;
        next();
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong while uploading to Supabase"})
    }
}

const fileMiddleware = {
    upload,
    uploadToSupabase
};

module.exports = fileMiddleware;