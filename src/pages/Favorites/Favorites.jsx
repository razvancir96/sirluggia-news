import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { removeFromFavorites } from '../../redux/favorites/favortiesActions';
import { Link } from 'react-router-dom';

function Favorites(props) {

    const { favoriteArticles, removeFromFavorites } = props;

    return (
        <Layout>
            <div className="container-fluid">
                { favoriteArticles && favoriteArticles.length
                    ? favoriteArticles.map((article) => {
                        return <div key={article.id}>
                            <Link to={`/article/${article.id}`}>
                                <h2>{article.pillarName} - {article.sectionName}</h2>
                                <h3>{article.webTitle}</h3>
                            </Link>
                            <button className="base-btn btn-dark" onClick={() => removeFromFavorites({articleId: article.id})}>
                                Remove from favorites
                            </button>
                        </div>
                    })
                    : <>
                        <p>You do not have any favorite news.</p>
                    </>
                }
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
