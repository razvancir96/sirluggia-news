import { START_GETTING_NEWS, UPDATE_NEWS_DATA, UPDATE_NEWS_ERROR } from './newsConstants';

const initialState = {
    data: [],
    loading: false,
    error: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case START_GETTING_NEWS:
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
