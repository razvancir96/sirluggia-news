import {
    START_GETTING_NEWS,
    UPDATE_NEWS_DATA,
    UPDATE_NEWS_ERROR,
    START_GETTING_ARTICLE,
    UPDATE_ARTICLE_DATA,
    UPDATE_ARTICLE_ERROR,
 } from './newsConstants';

const initialState = {
    data: [],
    articleData: [],
    loading: false,
    error: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case START_GETTING_NEWS:
        case START_GETTING_ARTICLE:
            return {
                ...state,
                loading: true,
                error: null
            }
        case UPDATE_NEWS_DATA:
            return {
                ...state,
                data: payload,
                loading: false,
                error: null
            }
        case UPDATE_ARTICLE_DATA:
            return {
                ...state,
                articleData: [
                    ...state.articleData,
                    payload
                ],
                loading: false,
                error: null
            }
        case UPDATE_ARTICLE_ERROR:
        case UPDATE_NEWS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}
