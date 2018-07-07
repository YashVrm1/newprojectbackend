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
    age: {
        type: String
    },
    sex: {
        type: String
    },
    enumeratorName: {
        type: String
    },
    surveyStation: {
        type: String
    },
    personalInformation1: {
        name: {
            type: String,
            default: ""
        },
        age: {
            type: String,
            default: ""
        },
        mobile: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
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
            type: String,
            default: ""
        },
    },
    regularTrip3: {
        origin: {
            type: String,
            default: ""
        },
        destination: {
            type: String,
            default: ""
        },
        distance: {
            type: String,
            default: ""
        },
        startTime: {
            type: String,
            default: ""
        },
        timeTaken: {
            type: String,
            default: ""
        },
    },
    modeOfTravel: {
        travelType: {
            type: String,
            default: "",
        },
        travelTrasport: {
            type: String,
            default: "",
        }
    },
    purposeTrip4: {
        type: String,
        default: ""
    },
    commuteTrip: {
        travelTime: {
            type: String,
            default: "",
        },
        opinionTrasport: {
            type: String,
            default: "",
        }
    },
    commuteTrip1: {
        cost: {
            type: String,
            default: "",
        },
        opinionCost: {
            type: String,
            default: "",
        }
    },
    commuteTrip2: {
        comfort: {
            type: String,
            default: "",
        },
        opinionComfort: {
            type: String,
            default: "",
        }
    },
    commuteTrip3: {
        travelSafety: {
            type: String,
            default: "",
        },
        opinionSafety: {
            type: String,
            default: "",
        }
    },
    useMetro6: {
        type: Boolean,
        default: ""
    },
    vehicleOwnerShip7: {
        cars: {
            type: String,
            default: ""
        },
        twoWheeler: {
            type: String,
            default: ""
        },
        bicycle: {
            type: String,
            default: ""
        },
    },
    costOfTravel8: {
        type: String,
        default: ""
    },
    paidByOffice9: {
        type: String,
        default: ""
    },
    willingness10: {
        type: String,
        default: ""
    },
    para: {
        modeUsed: {
            type: String,
            default: ""
        },
        access: {
            type: String,
            default: ""
        },
        mainTrip: {
            type: String,
            default: ""
        },
        egressTrip: {
            type: String,
            default: ""
        },
    },
    parameter1: {
        distance: {
            type: String,
            default: ""
        },
        access1: {
            type: String,
            default: ""
        },
        mainTrip1: {
            type: String,
            default: ""
        },
        egressTrip1: {
            type: String,
            default: ""
        },
    },
    parameter2: {
        cost: {
            type: String,
            default: ""
        },
        access2: {
            type: String,
            default: ""
        },
        mainTrip2: {
            type: String,
            default: ""
        },
        egressTrip2: {
            type: String,
            default: ""
        },
    },
    createdBy: {
        name: {
            type: String
        }
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('survey', surveySchema);
//# sourceMappingURL=surveyModel.js.map