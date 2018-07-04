"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CreateRandomId(length, type) {
    try {
        console.log("CreateRandomId");
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = '';
        let acc;
        for (let i = length; i > 0; i = i - 1)
            result += chars[Math.floor(Math.random() * chars.length)];
        const curr_date = new Date().getDate();
        const curr_month = (new Date().getMonth()) + 1;
        const curr_year = new Date().getFullYear();
        const date = (curr_date + curr_month + curr_year);
        const timeSec = new Date().getMilliseconds();
        if (type == 'product') {
            acc = 'PR-' + date + result + "-" + timeSec;
        }
        else if (type == 'supplier') {
            acc = 'SUP-' + date + result + "-" + timeSec;
        }
        else if (type == 'category') {
            acc = 'CAT-' + date + result + "-" + timeSec;
        }
        else if (type == 'brand') {
            acc = 'BR-' + date + result + "-" + timeSec;
        }
        else if (type == 'coupon') {
            acc = 'COU-' + date + result + "-" + timeSec;
        }
        else {
            acc = 'ID-' + date + result + "-" + timeSec;
        }
        console.log("acc", acc);
        return acc;
    }
    catch (error) {
        console.log("error", error);
        return error;
    }
}
exports.CreateRandomId = CreateRandomId;
//# sourceMappingURL=utility.js.map