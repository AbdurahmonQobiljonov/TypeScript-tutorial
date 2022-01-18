import {IData} from "../interfaces/interfaces";
import {useHttp} from '../hooks/http.hook'

 const useMarvelService = () => {
    const {error,loading,request,clearError}=useHttp();

    const _apiBase: string = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey: string = 'apikey=de519c606c9101226c4ce157bff823a4'
    const _baseOffset: number = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id: number) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char: any): IData => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items

        }
    }
    return{loading,error,clearError,getAllCharacters,getCharacter}

}
export default useMarvelService;
