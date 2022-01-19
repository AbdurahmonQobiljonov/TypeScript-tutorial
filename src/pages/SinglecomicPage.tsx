import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from "react/index";
import useMarvelService from "../services/MarvelService";
import ErrorMassage from "../components/errorMassage/ErrorMassage";
import Spinner from "../components/spinner/spinner";

import {IComices} from '../interfaces/interfaces'

import './singleComic.scss';

const SingleComic = (): JSX.Element => {
    const {id} = useParams();
    const [comic, setComic] = useState();
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [id])

    const updateComic = () => {
        clearError();

        getComic(id)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic: any) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}: { comic: IComices }) => {
    const {title, description, thumbnail, pageCount, language, price} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;