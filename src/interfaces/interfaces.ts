export interface IData {
    id?: number;
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
    comics?: IComics[];
}

export interface IComices {
    id: number;
    title: string;
    description: string;
    pageCount: string;
    thumbnail: string;
    language: string;
    price: string;
}

interface IComics {
    resourceURI: string;
    name: string;
}

export interface IError {
    error: boolean
}

export interface IProps {
    char: IData,
    loading?: boolean,
    error?: boolean,
    timerId?: number
}

export interface IState {
    charList: IData[],
    loading?: boolean,
    error?: boolean,
    newItemLoading?: boolean,
    offset: number,
    charEnded?: boolean
}