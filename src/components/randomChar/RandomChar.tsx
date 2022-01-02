import React from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import {IData, IProps,} from "../../interfaces/interfaces";
import View from "./View";
import Spinner from "../spinner/spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";

import './randomChar.scss';

class RandomChar extends React.Component {

    state: IProps = {
        char: {
            name: '',
            description: '',
            thumbnail: '',
            homepage: '',
            wiki: ''
        },
        loading: true,
        error: false,
    }
    timerId: number = 0

    componentDidMount(): void {
        this.updateChar();
        // this.timerId = window.setInterval(this.updateChar, 3000)
    }

    componentWillUnmount(): void {
        clearInterval(this.timerId)
    }

    marvelService = new MarvelService();

    onCharLoaded = (char: IData) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})

    }

    updateChar = () => {
        const id: number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render(): JSX.Element {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random_char">
                {errorMessage}
                {spinner}
                {content}
                <div className="random_char__static">
                    <p className="random_char__title">
                        Random character for today!
                        <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="random_char__title">Or choose another one</p>
                    <button
                        className="button button__main"
                        onClick={this.updateChar}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="random_char__decoration"/>
                </div>
            </div>
        );
    }
}

export default RandomChar;
