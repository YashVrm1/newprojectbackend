import { default as mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({

    userName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: String
    },
    address: {
        type: String
    },
    age: {
        type: String
    },
    sex: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('user', userSchema);