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
const EmployeeController_1 = require("./EmployeeController");
const router = express.Router();
router.post('/addEmployee', (req, res) => {
    EmployeeController_1.register(req, res);
});
router.post('/loginEmployee', (req, res) => {
    EmployeeController_1.login(req, res);
});
router.post('/getEmployee', (req, res) => {
    EmployeeController_1.getEmployee(req, res);
});
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map