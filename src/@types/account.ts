export type AccountState = {
    accountList: Array<Account>;
    accountCount:number
};


export type Account = {
    email: string;
    password: string;
};