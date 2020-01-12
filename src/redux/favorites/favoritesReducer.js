import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './favoritesConstants';

const initialState = {
    data: [],
    maxLimitReached: false
}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case ADD_TO_FAVORITES: {
            const foundArticle = state.data.find((article) => article.id === payload.article.id);
            if (foundArticle) return state;

            if (state.data.length === 10) {
                return {
                    ...state,
                    maxLimitReached: true
                }
            }

            return {
                ...state,
                data: [
                    ...state.data,
                    payload.article
                ]
            }
        }
        case REMOVE_FROM_FAVORITES: {
            const filteredArticles = state.data.filter((article) => article.id !== payload.articleId);

            if (state.data.length === 10) {
                return {
                    ...state,
                    data: filteredArticles,
                    maxLimitReached: false
                }
            }

            return {
                ...state,
                data: filteredArticles
            }
        }
        default:
            return state
    }
}
