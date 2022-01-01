import {Component} from "react/index";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state:{selectedChar:number}={
        selectedChar:0
    }

    onSelectedChar = (id:number) => {
        // @ts-ignore
        this.setState({selectedChar:id})
    }

    render(): JSX.Element {

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onSelectedChar}/>
                        <CharInfo />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;