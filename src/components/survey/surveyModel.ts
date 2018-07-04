import { default as mongoose } from 'mongoose';

const surveySchema = new mongoose.Schema({

    slNo: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    EnumeratorName: {
        type: String
    },
    personalInformation: {

    }
}, { timestamps: true });

export default mongoose.model('survey', surveySchema);