export type ReceiptState = {
    receiptList: Array<Receipt>;
    receiptDetail: Receipt | null;
    receiptCount: number;
  };
  
  export type ReceiptDetail = {
    id: number;
    productId: number;
    quantity: number;
    price: number;
  };
  
  export type Receipt = {
    id: number;
    supplierId: number;
    total:number;
    userId: number;
    productId: number;
    createDate: string;
    receiptDetails: Array<ReceiptDetail>; // Array of receipt details
  };
  