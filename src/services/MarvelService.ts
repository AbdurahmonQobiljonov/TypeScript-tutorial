export default class MarvelService {

    _apiBase:string='https://gateway.marvel.com:443/v1/public/';
    _apiKey:string='apikey=de519c606c9101226c4ce157bff823a4'

    getResource = async (url: string): Promise<Array<object>> => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} , status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource('\n' +
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = (id: number) => {
        return this.getResource('\n' +
            `${this._apiBase}characters/${id}?${this._apiKey}`)
    }

}

