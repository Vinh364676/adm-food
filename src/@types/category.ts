export type CategoryState = {
    categoryList: Array<Category>;
    categoryDetail:Category
    categoryCount:number
};


export type Category = {
    id: number;
    name: string;
    status:string;
    bannerUrl:string;
};