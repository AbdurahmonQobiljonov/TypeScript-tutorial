import React, {useState, useEffect, useRef} from 'react';
import Spinner from "../spinner/spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import MarvelService from '../../services/MarvelService';
import {IData} from "../../interfaces/interfaces";
import {onCharSelect} from "./CharListProps";
import './charList.scss';


const CharList = (props: onCharSelect) => {

    const [charList, setCharList] = useState<IData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [newItemLoading, setNewItemLoading] = useState<boolean>(false)
    const [offset, setOffset] = useState<number>(210)
    const [charEnded, setCharEnded] = useState<boolean>(false)


    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest(offset)
    }, [])

    function onRequest(offset: number) {
        onCharListLoading()

        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    function onCharListLoaded(newCharList: IData[]) {
        let ended = false;
        if (newCharList.length > 9) {
            ended = true;
        }
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended)
        setCharList(charList => ([...charList, ...newCharList]))
    }

    function onCharListLoading() {
        setNewItemLoading(true)
    }

    function onError() {
        setError(true);
        setLoading(false);
    }

    const itemRefs = useRef<(HTMLElement|null)[]>([]);


    const focusOnItem = (id: number) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        // @ts-ignore
        itemRefs?.current?.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs?.current[id]?.classList.add('char__item_selected');
        itemRefs?.current[id]?.focus();
    }

    function renderItems
    (arr: IData[]) {
        const items = arr?.map((item, i) => {
            const _url: string = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

            return (
                <li
                    key={`${item.id}_${item.name}`}
                    ref={el=>itemRefs.current[i]=el}
                    className="char__item"
                    onClick={() => {
                        // @ts-ignore
                        props.onCharSelected(item?.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            // @ts-ignore
                            props.onCharSelected(item?.id);
                            focusOnItem(i);
                        }
                    }}
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


    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                onClick={() => onRequest(offset)}
                style={{display: charEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                disabled={newItemLoading}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;
