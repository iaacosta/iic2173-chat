import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './base.scss';

import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:5000';

ReactDOM.render(<App />, document.getElementById('root'));
