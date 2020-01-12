import React, { useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/newsActions';
import { addToFavorites } from '../../redux/favorites/favortiesActions';
import { Link } from 'react-router-dom';

function Home(props) {

    const {getNews, newsList, history, location, addToFavorites} = props;

    useEffect(() => {
        const queryString = location.search;
        const pageNumber = getPageNumberFromQueryString(queryString);
        getNews({page: pageNumber});
    }, [getNews, location.search]);

    function goToPage(page) {
        const pageQueryString = page === 1 ? '' : `?page=${page}`;
        history.push({search: pageQueryString});
    }
    function getPageNumberFromQueryString(queryString) {
        return queryString ? Number(queryString[queryString.length - 1]) : 1
    }
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
            <div>
                <h1>HOME</h1>
                { newsList
                    && newsList.map(news => (
                        <div key={news.id}>
                            <Link to={`/article/${news.id}`}>
                                <h2>{news.pillarName} - {news.sectionName}</h2>
                                <h3>{news.webTitle}</h3>
                            </Link>
                            <button
                                className="base-btn btn-dark"
                                onClick={() => addToFavorites(buildAddToFavoritesPayload(news))}
                            >
                                Add to favorites
                            </button>
                        </div>
                    ))
                }
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={'page-item ' + (getPageNumberFromQueryString(location.search) === 1 ? 'active' : '')}>
                            <button className="page-link" onClick={() => goToPage(1)}>
                                1
                            </button>
                        </li>
                        <li className={'page-item ' + (getPageNumberFromQueryString(location.search) === 2 ? 'active' : '')}>
                            <button className="page-link" onClick={() => goToPage(2)}>
                                2
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </Layout>
    )
}

function mapStateToProps(state) {
    return {
        newsList: state.news.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getNews: (payload) => dispatch(getNews(payload)),
        addToFavorites: (payload) => dispatch(addToFavorites(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
