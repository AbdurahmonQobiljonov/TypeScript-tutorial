export interface IData {
    id?: number;
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
}

export interface IProps { char: IData, loading?: boolean,error?:boolean }