import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import MarvelService from "./services/MarvelService";

import './style/style.scss';

const marvelService = new MarvelService ();
marvelService.getAllCharacters().then(res=>console.log(res));
marvelService.getCharacter(1011052).then(res=>console.log(res));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
