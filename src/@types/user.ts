export type UserState = {
    userList: Array<User>;
    userCount:number
};


export type User = {
    id: number;
    customerId: number;
    email:string;
    displayName:string;
    roleId:number;
    phoneNumber:string;
    isLockedout:boolean;
    employeeId:number;
    password:string
};