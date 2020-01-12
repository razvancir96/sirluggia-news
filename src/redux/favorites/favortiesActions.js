import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './favoritesConstants';

export const addToFavorites = (payload) => ({
    type: ADD_TO_FAVORITES,
    payload
});

export const removeFromFavorites = (payload) => ({
    type: REMOVE_FROM_FAVORITES,
    payload
})

