import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getArticle } from '../../redux/news/newsActions';
import { addToFavorites } from '../../redux/favorites/favortiesActions';
import './Article.scss';

function Article(props) {

    const { match, getArticle, articleInfo, location, addToFavorites } = props;

    useEffect(() => {
        getArticle({
            articleId: match.params.articleId,
            route: location.pathname
        });
    }, [getArticle, match.params.articleId, location.pathname]);

    function buildAddToFavoritesPayload(articleInfo) {
        const {id, pillarName, sectionName, webTitle} = articleInfo

        return {
            article: {
                id,
                pillarName,
                sectionName,
                webTitle
            }
        }
    }

    return (
        <Layout>
            <div className="article container-fluid container-min-max-width">
                { articleInfo
                    && <>
                        <h1 className="text-title h2 pb-2 mb-4">{articleInfo.webTitle}</h1>
                        <div className="d-flex justify-content-between mb-5">
                            <p className="text-subtitle h4">{articleInfo.pillarName} > {articleInfo.sectionName}</p>
                            <p className="text-subtitle h5">{articleInfo.webPublicationDate}</p>
                        </div>
                        <p className="h5 mb-3">
                            If you want to read the whole article, you can do it on TheGuardian website:
                            <a className="font-weight-bold text-title" href={articleInfo.webUrl}> click here!</a>
                        </p>
                        <button
                            className="base-btn"
                            onClick={() => addToFavorites(buildAddToFavoritesPayload(articleInfo))}
                        >
                            Add to favorites
                        </button>
                    </>
                }
            </div>
        </Layout>
    )
}

function mapStateToProps(state, props) {
    return {
        articleInfo: state.news.articleData.find((article) => article.route === props.location.pathname)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getArticle: (payload) => dispatch(getArticle(payload)),
        addToFavorites: (payload) => dispatch(addToFavorites(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
