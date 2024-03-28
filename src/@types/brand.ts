export type BrandState = {
    brandList: Array<Brand>;
    brandDetail:Brand
    brandCount:number
};


export type Brand = {
    id: number;
    name: string;
    createdDT:string;
};