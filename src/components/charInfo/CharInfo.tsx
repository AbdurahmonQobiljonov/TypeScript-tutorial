import {useState, useEffect} from "react/index";
import {IData, IProps} from "../../interfaces/interfaces";
import MarvelService from "../../services/MarvelService";
import {charId} from "./CharinfoProps";
import View from "./View";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/spinner";
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';
import {ErrorInfo, ReactElement} from "react";

const CharInfo = (props: charId):JSX.Element => {
    const [char, setChar] = useState<IData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharLoading = (): void => {
        setLoading(true)
    }

    const onCharListLoaded = (char: IData) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true)
        setLoading(true)
    }


    const skeleton = char?.name || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char?.name) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

export default CharInfo;