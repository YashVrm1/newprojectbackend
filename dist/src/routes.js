"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRoutes_1 = __importDefault(require("./components/superAdmin/adminRoutes"));
const employeeRoutes_1 = __importDefault(require("./components/employee/employeeRoutes"));
const adminString = "/admin";
const employeeString = "/employee";
exports.default = (app) => {
    app.use(adminString, adminRoutes_1.default);
    app.use(employeeString, employeeRoutes_1.default);
};
//# sourceMappingURL=routes.js.map