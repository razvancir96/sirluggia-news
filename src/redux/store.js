import { createStore, combineReducers, applyMiddleware } from 'redux';
import favoritesReducer from './favorites/favoritesReducer';
import newsReducer from './news/newsReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    news: newsReducer
});

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;