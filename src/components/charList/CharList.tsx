import React, {Component} from 'react';
import Spinner from "../spinner/spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import MarvelService from '../../services/MarvelService';
import {IData} from "../../interfaces/interfaces";
import {onCharSelect} from "./CharListProps";
import './charList.scss';



class CharList extends Component<onCharSelect> {

    state:{charList:IData[],loading:boolean,error:boolean} = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList:IData[]) => {
        this.setState({
            charList,
            loading: false
        })
    }


    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    renderItems(arr:IData[]) {
        const items =  arr?.map((item) => {const _url:string  = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            console.log(item.id)
            return (
                <li
                    key={`${item.id}_${item.name}`}
                    className="char__item"
                    onClick={()=>this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} style={item.thumbnail===_url?{objectFit : 'contain'}:{objectFit : 'cover'}}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
