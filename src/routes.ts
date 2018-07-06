import adminRoute from "./components/superAdmin/adminRoutes";
import employeeRoute from "./components/employee/employeeRoutes";
import userRoute from "./components/user/userRoutes";
import surveyRoutes from "./components/survey/surveyRoutes";
const adminString = "/admin";
const employeeString = "/employee";
const surveyString = "/survey";
const userString = "/user";
export default (app: any) => {
        app.use(adminString, adminRoute);
        app.use(employeeString, employeeRoute);
        app.use(userString, userRoute);
        app.use(surveyString, surveyRoutes);
};
