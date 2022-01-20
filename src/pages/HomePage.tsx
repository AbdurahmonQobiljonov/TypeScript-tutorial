import {useState,lazy} from "react/index";

import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import decoration from '../resources/img/vision.png';

const CharInfo = lazy(()=> import("../components/charInfo/CharInfo"));

const HomePage = () =>{
    const [selectedChar, setChar] = useState<number>(0)

    const onSelectedChar = (id: number) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onSelectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default HomePage;