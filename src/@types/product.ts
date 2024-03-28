export type ProductState = {
    productCount?: number;
    productList:Array<Product>;
    productDetail:Product

};

export type Product ={
    id:number,
    productName:string,
    price:number,
    quantity:string,
    brandId:number,
    categoryId:number,
    img:string,
    thumnail:string,
    size:string,
    color:string,
    description:string,
    code:string,
    gender:string,
    status:string,
    createdDT:string

}
