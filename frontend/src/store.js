import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { foodsReducer, foodDetailsReducer } from './reducers/foodReducers'

const reducer = combineReducers({
    foods: foodsReducer,
    foodDetails: foodDetailsReducer
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;