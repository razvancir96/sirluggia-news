import { createStore, combineReducers, applyMiddleware } from 'redux';
import favoritesReducer from './favorites/favoritesReducer';
import newsReducer from './news/newsReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites']
};

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    news: newsReducer
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(persistedRootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);