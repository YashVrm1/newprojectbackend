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
const express = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const EmployeeController_1 = require("./EmployeeController");
const router = express.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log("hii");
        cb(undefined, 'src/public/images');
    },
    filename: function (req, file, cb) {
        cb(undefined, file.fieldname + Date.now() + path_1.default.extname(file.originalname));
        console.log("///" + file.fieldname + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({
    storage: storage
});
router.post('/addEmployee', upload.single('img'), (req, res) => {
    EmployeeController_1.register(req, res);
});
router.post('/loginEmployee', (req, res) => {
    EmployeeController_1.login(req, res);
});
router.post('/getEmployee', (req, res) => {
    EmployeeController_1.getEmployee(req, res);
});
router.post('/imageupload', upload.single('picture'), (req, res) => {
    // console.log('res in routes', req.body);
    EmployeeController_1.imgUpload(req, res);
});
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map