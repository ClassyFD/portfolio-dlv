import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Reducers from './redux/reducers';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

ReactDOM.render(
  <Provider store={createStore(Reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
