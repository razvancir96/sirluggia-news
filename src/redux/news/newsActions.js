import {
    START_GETTING_NEWS,
    UPDATE_NEWS_DATA,
    UPDATE_NEWS_ERROR,
    START_GETTING_ARTICLE,
    UPDATE_ARTICLE_DATA,
    UPDATE_ARTICLE_ERROR,
 } from './newsConstants';
import { store } from '../store';

const THE_GUARDIAN_API_KEY = process.env.REACT_APP_THE_GUARDIAN_API_KEY;

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
});

export const doNothing = () => ({
    type: 'DO_NOTHING'
});

export const getNews = (payload) => {
    const newsPages = store.getState().news.data;
    const cachedNewsPage = newsPages.find((newsPage) => newsPage.route === payload.route);

    const url = `https://content.guardianapis.com/search?api-key=${THE_GUARDIAN_API_KEY}&page=${payload.page}`;

    return (dispatch) => {
        if (cachedNewsPage) {
            dispatch(doNothing());
        } else {
            dispatch(startGettingNews());

            fetch(url).then(response => response.json()).then(news => {
                const filteredResults = news.response.results.map((result) => {
                    const { id, sectionName, webTitle, pillarName } = result;

                    return {
                        id,
                        sectionName,
                        webTitle,
                        pillarName
                    }
                });
                dispatch(updateNewsData({
                    route: payload.route,
                    items: filteredResults
                }));
            }).catch(error => {
                dispatch(updateNewsError(error));
            });
        }
    }
}

export const startGettingArticle = () => ({
    type: START_GETTING_ARTICLE
});

export const updateArticleData = (payload) => ({
    type: UPDATE_ARTICLE_DATA,
    payload
});

export const updateArticleError = (payload) => ({
    type: UPDATE_ARTICLE_ERROR,
    payload
});

export const getArticle = (payload) => {
    const articleData = store.getState().news.articleData;
    const cachedArticle = articleData.find((article) => article.route === payload.route);

    const url = `https://content.guardianapis.com/${payload.articleId}?api-key=${THE_GUARDIAN_API_KEY}`;

    return (dispatch) => {
        if (cachedArticle) {
            dispatch(doNothing());
        } else {
            dispatch(startGettingArticle());

            fetch(url).then(response => response.json()).then((article) => {
                const articleInfo = article.response.content;
                const { id, sectionName, webPublicationDate, webTitle, webUrl, pillarName } = articleInfo;

                const filteredArticleInfo = {
                    route: payload.route,
                    id,
                    sectionName,
                    webPublicationDate,
                    webTitle,
                    webUrl,
                    pillarName
                }

                dispatch(updateArticleData(filteredArticleInfo));
            }).catch(error => {
                dispatch(updateArticleError(error));
            });
        }
    }
}