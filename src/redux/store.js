import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './index'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
