import { default as mongoose } from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    employeeName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: String
    },
    picture: {
        type: String
    },
}, { timestamps: true });

export default mongoose.model('employee', EmployeeSchema);