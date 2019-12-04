import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './base.scss';

import App from './App';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

ReactDOM.render(<App />, document.getElementById('root'));
