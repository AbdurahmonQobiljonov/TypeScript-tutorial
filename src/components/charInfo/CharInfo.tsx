import {useState, useEffect} from "react/index";
import {IData} from "../../interfaces/interfaces";
import useMarvelService from "../../services/MarvelService";
import {charId} from "./CharinfoProps";
import View from "./View";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/spinner";
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props: charId): JSX.Element => {
    const [char, setChar] = useState<IData>();

    const {error, loading, getCharacter,clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (char: IData) => {
        setChar(char);
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