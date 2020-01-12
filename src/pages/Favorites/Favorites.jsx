import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { removeFromFavorites } from '../../redux/favorites/favortiesActions';
import { Link } from 'react-router-dom';
import './Favorites.scss';

function Favorites(props) {

    const { favoriteArticles, removeFromFavorites } = props;

    return (
        <Layout>
            <div className="favorites container-fluid container-min-max-width">
                <div className="row">
                    { favoriteArticles && favoriteArticles.length
                        ? favoriteArticles.map((article) => {
                            return <div className="article-box col-12 mb-5 pb-2" key={article.id}>
                                <Link to={`sirluggia-news/article/${article.id}`}>
                                    <h1 className="text-title h3">{article.webTitle}</h1>
                                    <p className="text-subtitle h5 mb-4">{article.pillarName} - {article.sectionName}</p>
                                </Link>
                                <button className="base-btn" onClick={() => removeFromFavorites({articleId: article.id})}>
                                    Remove from favorites
                                </button>
                            </div>
                        })
                        : <>
                            <p className="h4">
                                You do not have any favorite news.
                            </p>
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

function mapStateToProps(state) {
    return {
        favoriteArticles: state.favorites.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeFromFavorites: (payload) => dispatch(removeFromFavorites(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
