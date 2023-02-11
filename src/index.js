import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import rootReducer from "./store/reducers/rootReducer";
import documentReducer from "./store/reducers/documentReducer";
import productReducer from "./store/reducers/productReducer";
import clientReducer from "./store/reducers/clientReducer";
import {createStore, applyMiddleware, compose , combineReducers} from 'redux';
import thunk from 'redux-thunk';


const reducers = combineReducers({rootReducer , documentReducer , productReducer , clientReducer});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
