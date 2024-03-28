export type HistoryDetailState = {
    historyDetailList: Array<HistoryDetail>;
    historydetail:HistoryDetail
    historycount:number
};

export type HistoryDetail = {
    id: number;
    billId: number;
    productId:number;
    unitPrice:number;
    quantity:number
};