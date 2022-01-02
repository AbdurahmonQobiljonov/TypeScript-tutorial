import {Component} from "react/index";
import {IData, IProps} from "../../interfaces/interfaces";
import MarvelService from "../../services/MarvelService";
import {charId} from "./CharinfoProps";
import View from "../charList/View";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/spinner";
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component<charId> {

    state: IProps = {
        char: {
            name: '',
            description: '',
            thumbnail: '',
            homepage: '',
            wiki: '',
            comics: [{
                resourceURI: '',
                name: ''
            }]
        },
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps: any): void {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharLoading = (): void => {
        this.setState({
            loading: true,
        })
    }

    onCharListLoaded = (char: IData) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: true
        })
    }

    render(): JSX.Element {
        const {char, loading, error} = this.state

        const skeleton = char.name || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char.name) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

export default CharInfo;