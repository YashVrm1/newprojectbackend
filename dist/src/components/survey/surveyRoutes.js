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
const permission_1 = require("../util/permission");
const surveyController_1 = require("./surveyController");
const router = express.Router();
router.post('/addEmployee', permission_1.verifyToken, (req, res) => {
    surveyController_1.survey(req, res);
});
exports.default = router;
//# sourceMappingURL=surveyRoutes.js.map