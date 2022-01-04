import {IProps} from "../../interfaces/interfaces";

const View = ({char}: IProps): JSX.Element => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const _url:string  = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={thumbnail===_url?{objectFit : 'contain'}:{objectFit : 'cover'}} alt={name}/>
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
                {comics!.length>0?null:'there is no comics with this character'}
                {
                    comics?.map((elem,i)=>{

                        // eslint-disable-next-line array-callback-return
                        if(i>9)return;

                        return(
                            <li key={i} className="char__comics-item">
                                {elem.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}
export default View;


