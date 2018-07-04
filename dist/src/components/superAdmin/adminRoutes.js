"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("./adminController");
const express = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(undefined, 'src/public/images');
    },
    filename: function (req, file, cb) {
        cb(undefined, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({
    storage: storage
});
router.post("/register", upload.single('picture'), (req, res) => {
    // console.log("post AdminRoutes.......?",req.query,req.body)
    adminController_1.createAdmin(req, res);
});
router.post('/login', (req, res) => {
    adminController_1.adminLogin(req, res);
});
router.post('/imageupload', upload.single('picture'), (req, res) => {
    // console.log('res in routes', req.body);
    adminController_1.imgUpload(req, res);
});
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map