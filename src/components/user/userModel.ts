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
    age: {
        type: String
    },
    sex: {
        type: String
    },
    origin: {
        latitude: {
            type: String,
            default: ""
        },
        longitude: {
            type: String,
            default: ""
        }
    },
    destination: {
        latitude1: {
            type: String,
            default: ""
        },
        longitude1: {
            type: String,
            default: ""
        }
    }
    // loggedIn: {
    //     type: String,
    //     default: ""
    // }
}, { timestamps: true });

export default mongoose.model('user', userSchema);