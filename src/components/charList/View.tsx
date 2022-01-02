import {IProps} from "../../interfaces/interfaces";

const View = ({char}: IProps): JSX.Element => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    console.log(comics)
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    name
                </li>
            </ul>
        </>
    )
}
export default View;

function elem(elem: any, i: any): import("react").ReactNode {
    throw new Error("Function not implemented.");
}
