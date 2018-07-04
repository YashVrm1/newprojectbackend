import adminRoute from "./components/superAdmin/adminRoutes";
import employeeRoute from "./components/employee/employeeRoutes";
const adminString = "/admin";
const employeeString = "/employee";
export default (app: any) => {
        app.use(adminString, adminRoute);
        app.use(employeeString, employeeRoute);

};
