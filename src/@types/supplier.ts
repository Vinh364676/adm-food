export type SupplierState = {
    supplierCount?: number;
    supplierList:Array<Supplier>;
    supplierDetail:Supplier

};

export type Supplier ={
    id:number,
    name:string,
    address:string,
    phoneNumber:string,
    email:string,

}
