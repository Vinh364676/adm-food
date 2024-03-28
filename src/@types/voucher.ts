export type VoucherState = {
    voucherList: Array<Voucher>;
    voucherDetail:Voucher
    voucherCount:number
};


export type Voucher = {
    id: number;
    code: string;
    value:number;
    startDate:string;
    endDate:string;
};