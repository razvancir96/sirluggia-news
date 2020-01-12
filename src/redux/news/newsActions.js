import {
    START_GETTING_NEWS,
    UPDATE_NEWS_DATA,
    UPDATE_NEWS_ERROR,
    START_GETTING_ARTICLE,
    UPDATE_ARTICLE_DATA,
    UPDATE_ARTICLE_ERROR,
 } from './newsConstants';
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
            const filteredResults = news.response.results.map((result) => {
                const { id, sectionName, webTitle, pillarName } = result;

                return {
                    id,
                    sectionName,
                    webTitle,
                    pillarName
                }
            });
            dispatch(updateNewsData(filteredResults));
        }).catch(error => {
            dispatch(updateNewsError(error));
        });
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
})

export const getArticle = (payload) => {
    const url = `https://content.guardianapis.com/${payload.articleId}?api-key=${THE_GUARDIAN_API_KEY}`;

    return (dispatch) => {
        dispatch(startGettingArticle());

        fetch(url).then(response => response.json()).then((article) => {
            const articleInfo = article.response.content;
            const { id, sectionName, webPublicationDate, webTitle, webUrl, pillarName } = articleInfo;

            const filteredArticleInfo = {
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