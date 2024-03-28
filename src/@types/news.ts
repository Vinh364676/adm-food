export type EventNewState = {
    news: Array<Event>;
};


export type Event = {
    id: number;
    name: string;
    description: string;
    thumbnail:string;
    content: string;
    createdAt:string;
    type:string;
};