import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getArticle } from '../../redux/news/newsActions';
import { addToFavorites } from '../../redux/favorites/favortiesActions';

function Article(props) {

    const { match, getArticle, articleInfo, location } = props;

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
            <div className="container-fluid">
                { articleInfo
                    && <>
                        <h1>{articleInfo.webTitle}</h1>
                        <p>{articleInfo.webPublicationDate}</p>
                        <p>{articleInfo.sectionName}</p>
                        <p><a href={articleInfo.webUrl}>View the news on TheGuardian!</a></p>
                        <button
                            className="base-btn btn-dark"
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
