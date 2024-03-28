export type AccessoryState = {
    accessoryList : Array<Accessory>;
    accessoryDetail:Accessory
    accessoryCount:number
}

export type Accessory ={
    id:number;
    name:string;
    createdDT:string;
    type:number;
}