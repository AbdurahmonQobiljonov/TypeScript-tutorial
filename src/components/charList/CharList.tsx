import React, {Component} from 'react';
import Spinner from "../spinner/spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import MarvelService from '../../services/MarvelService';
import {IData, IState} from "../../interfaces/interfaces";
import {onCharSelect} from "./CharListProps";
import './charList.scss';


class CharList extends Component<onCharSelect> {

    state: IState = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(this.state.offset)
    }

    onRequest = (offset: number) => {
        this.onCharListLoading()

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (newCharList: IData[]) => {
        let ended = false;
        if (newCharList.length > 9) {
            ended = true;
        }


        this.setState(({charList, offset}: IState) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true,})
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    renderItems(arr: IData[]) {
        const items = arr?.map((item) => {
            const _url: string = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            return (
                <li
                    key={`${item.id}_${item.name}`}
                    className="char__item"
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name}
                         style={item.thumbnail === _url ? {objectFit: 'contain'} : {objectFit: 'cover'}}/>
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

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    onClick={() => this.onRequest(offset)}
                    style={{display:charEnded?'none':'block'}}
                        className="button button__main button__long"
                        disabled={newItemLoading}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
