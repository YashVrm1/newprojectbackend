import { default as mongoose } from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('employee', EmployeeSchema);