"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const surveySchema = new mongoose_1.default.Schema({
    email: {
        type: String
    },
    userName: {
        type: String
    },
    phoneNo: {
        type: String
    },
    EnumeratorName: {
        type: String
    },
    personalInformation1: {
        name: {
            type: String
        },
        age: {
            type: String
        },
        mobile: {
            type: String
        },
        gender: {
            type: String
        },
    },
    reasonNoMetro2: {
        notRoute: {
            type: Boolean,
            default: false
        },
        lackOfService: {
            type: Boolean,
            default: false
        },
        travelTimeHigh: {
            type: Boolean
        },
        unaffordableFare: {
            type: Boolean
        },
        highReachingCost: {
            type: Boolean
        },
        modeChanges: {
            type: Boolean
        },
        crowded: {
            type: Boolean
        },
        seatAvailable: {
            type: Boolean
        },
        security: {
            type: Boolean
        },
        other: {
            type: String
        },
    },
    regularTrip3: {
        origin: {
            type: String
        },
        destination: {
            type: String
        },
        distance: {
            type: String
        },
        startTime: {
            type: String
        },
        timeTaken: {
            type: String
        },
    },
    modeOfTravel: {
        travelType: {
            type: String,
        },
        travelTrasport: {
            type: String,
        }
    },
    purposeTrip4: {
        type: String
    },
    useMetro6: {
        type: Boolean,
        default: ""
    },
    vehicleOwnerShip7: {
        cars: {
            type: String
        },
        twoWheeler: {
            type: String
        },
        bicycle: {
            type: String
        },
    },
    costOfTravel8: {
        type: String
    },
    paidByOffice9: {
        type: String
    },
    willingness10: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('survey', surveySchema);
//# sourceMappingURL=surveyModel.js.map