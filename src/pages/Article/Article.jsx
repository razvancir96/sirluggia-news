import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getArticle } from '../../redux/news/newsActions';

function Article(props) {

    const { match, getArticle, articleInfo, location } = props;

    useEffect(() => {
        getArticle({
            articleId: match.params.articleId,
            route: location.pathname
        });
    }, [getArticle, match.params.articleId, location.pathname]);

    return (
        <Layout>
            <div>
                { articleInfo
                    && <>
                        <h1>{articleInfo.webTitle}</h1>
                        <p>{articleInfo.webPublicationDate}</p>
                        <p>{articleInfo.sectionName}</p>
                        <p><a href={articleInfo.webUrl}>View the news on TheGuardian!</a></p>
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
        getArticle: (payload) => dispatch(getArticle(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
