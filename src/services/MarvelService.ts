import {IData} from "../interfaces/interfaces";

export default class MarvelService {

    _apiBase: string = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey: string = 'apikey=de519c606c9101226c4ce157bff823a4'

    getResource = async (url: string):Promise<any> => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} , status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('\n' +
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id: number) => {
        const res = await this.getResource('\n' +
            `${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char:any):IData => {
        return {
            id:char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

}

