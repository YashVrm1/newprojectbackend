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
            type: Boolean,
            default: false
        },
        unaffordableFare: {
            type: Boolean,
            default: false
        },
        highReachingCost: {
            type: Boolean,
            default: false
        },
        modeChanges: {
            type: Boolean,
            default: false
        },
        crowded: {
            type: Boolean,
            default: false
        },
        seatAvailable: {
            type: Boolean,
            default: false
        },
        security: {
            type: Boolean,
            default: false
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
    commuteTrip: {
        travelTime: {
            type: String,
        },
        opinionTrasport: {
            type: String,
        }
    },
    commuteTrip1: {
        cost: {
            type: String,
        },
        opinionCost: {
            type: String,
        }
    },
    commuteTrip2: {
        comfort: {
            type: String,
        },
        opinionComfort: {
            type: String,
        }
    },
    commuteTrip3: {
        travelSafety: {
            type: String,
        },
        opinionSafety: {
            type: String,
        }
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
    },
    parameter: {
        modeUsed: {
            type: String
        },
        distance: {
            type: String
        },
        cost: {
            type: String
        },
        access: {
            type: String
        },
        mainTrip: {
            type: String
        },
        egressTrip: {
            type: String
        },
    },
    parameter1: {
        modeUsed: {
            type: String
        },
        distance: {
            type: String
        },
        cost: {
            type: String
        },
        access: {
            type: String
        },
        mainTrip: {
            type: String
        },
        egressTrip: {
            type: String
        },
    },
    parameter2: {
        modeUsed: {
            type: String
        },
        distance: {
            type: String
        },
        cost: {
            type: String
        },
        access: {
            type: String
        },
        mainTrip: {
            type: String
        },
        egressTrip: {
            type: String
        },
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('survey', surveySchema);
//# sourceMappingURL=surveyModel.js.map