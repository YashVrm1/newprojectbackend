import { default as mongoose } from 'mongoose';


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    userName: {
        type: String,
    },
    picture: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
