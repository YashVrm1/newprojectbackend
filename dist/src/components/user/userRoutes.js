"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const userController_1 = require("./userController");
const router = express.Router();
router.post('/getuser', (req, res) => {
    userController_1.getuser(req, res);
});
router.post('/adduser', (req, res) => {
    userController_1.adduser(req, res);
});
router.put('/updateDes', (req, res) => {
    userController_1.updatedestination(req, res);
});
router.put('/updateOrigin', (req, res) => {
    userController_1.updateorigin(req, res);
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map