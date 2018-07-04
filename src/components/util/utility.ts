export function CreateRandomId(length: number, type: any): any {
    try {
        console.log("CreateRandomId");
        const chars: any = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result: any = '';
        let acc: any;
        for (let i: number = length; i > 0; i = i - 1)
            result += chars[Math.floor(Math.random() * chars.length)];
        const curr_date: any = new Date().getDate();
        const curr_month: any = (new Date().getMonth()) + 1;
        const curr_year: any = new Date().getFullYear();
        const date: any = (curr_date + curr_month + curr_year);
        const timeSec: any = new Date().getMilliseconds();
        if (type == 'product') { acc = 'PR-' + date + result + "-" + timeSec; }
        else if (type == 'supplier') { acc = 'SUP-' + date + result + "-" + timeSec; }
        else if (type == 'category') { acc = 'CAT-' + date + result + "-" + timeSec; }
        else if (type == 'brand') { acc = 'BR-' + date + result + "-" + timeSec; }
        else if (type == 'coupon') { acc = 'COU-' + date + result + "-" + timeSec; }
        else { acc = 'ID-' + date + result + "-" + timeSec; }
        console.log("acc", acc);
        return acc;
    } catch (error) {
        console.log("error", error);
        return error;
    }
}