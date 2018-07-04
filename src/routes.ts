import adminRoute from "./components/superAdmin/adminRoutes";
import employeeRoute from "./components/employee/employeeRoutes";
import userRoute from "./components/user/userRoutes";
const adminString = "/admin";
const employeeString = "/employee";
const userString = "/user";
export default (app: any) => {
        app.use(adminString, adminRoute);
        app.use(employeeString, employeeRoute);
        app.use(userString, userRoute);

};
