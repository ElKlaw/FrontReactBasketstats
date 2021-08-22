import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'moment/locale/fr'
import moment from "moment"
import { LocalizationProvider } from '@material-ui/lab';
import AdapterMoment from '@material-ui/lab/AdapterMoment';

moment().locale('fr')

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment} locale="fr">
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
