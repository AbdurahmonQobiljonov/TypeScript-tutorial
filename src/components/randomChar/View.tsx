import {IData} from "../../interfaces/interfaces";



const View = ({char}:{char:IData}) =>{
    const {name,description,thumbnail,homepage,wiki}=char;
    const _url:string  = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'


    return (
        <div className="random_char__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="random_char__img"
                style={thumbnail===_url?{objectFit : 'contain'}:{objectFit : 'cover'}}
            />
            <div className="random_char__info">
                <p className="random_char__name">{name}</p>
                <p className="random_char__descr">
                    {description}
                </p>
                <div className="random_char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default View;