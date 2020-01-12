import { START_GETTING_NEWS, UPDATE_NEWS_DATA, UPDATE_NEWS_ERROR } from './newsConstants';
import { THE_GUARDIAN_API_KEY } from '../../configs/theGuardian';

export const startGettingNews = () => ({
    type: START_GETTING_NEWS
});

export const updateNewsData = (payload) => ({
    type: UPDATE_NEWS_DATA,
    payload
});

export const updateNewsError = (payload) => ({
    type: UPDATE_NEWS_ERROR,
    payload
})

export const getNews = (payload) => {
    const url = `https://content.guardianapis.com/search?api-key=${THE_GUARDIAN_API_KEY}&page=${payload.page}`;

    return (dispatch) => {
        dispatch(startGettingNews());

        fetch(url).then(response => response.json()).then(news => {
            dispatch(updateNewsData(news.response.results));
        }).catch(error => {
            dispatch(updateNewsError(error));
        });
    }
}
