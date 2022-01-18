import {useState, useEffect} from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import {IData} from "../../interfaces/interfaces";
import View from "./View";
import Spinner from "../spinner/spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState<IData>();
    const {error,loading,getCharacter,clearError}=useMarvelService()

    useEffect(() => {
        updateChar();
        // const timerId = window.setInterval(updateChar, 3000)
        return () => {
            // clearInterval(timerId)
        }

    }, [])

    const onCharLoaded = (char: IData) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError();
        const id: number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? char && <View char={char}/> : null;

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
                    onClick={updateChar}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="random_char__decoration"/>
            </div>
        </div>
    );
}

export default RandomChar;
