import React, { useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/newsActions';
import { addToFavorites } from '../../redux/favorites/favortiesActions';
import { Link } from 'react-router-dom';
import './Home.scss';

function Home(props) {

    const {getNews, newsList, history, location, addToFavorites} = props;

    useEffect(() => {
        const queryString = location.search;
        const pageNumber = getPageNumberFromQueryString(queryString);
        const fullPath = location.pathname + location.search;
        getNews({
            page: pageNumber,
            route: fullPath
        });
    }, [getNews, location.search, location.pathname]);

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
            <div className="home container-fluid container-min-max-width">
                <div className="row">
                    { newsList && newsList.items
                        && newsList.items.map(news => (
                            <div className="article-box col-12 col-lg-6 mb-4 pl-2 pr-5 py-3" key={news.id}>
                                <Link to={`/sirluggia-news/article/${news.id}`} className="text-title">
                                    <h1 className="text-title h3">{news.webTitle}</h1>
                                    <p className="text-subtitle h5">{news.pillarName} > {news.sectionName}</p>
                                </Link>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="base-btn"
                                        onClick={() => addToFavorites(buildAddToFavoritesPayload(news))}
                                    >
                                        Add to favorites
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <nav aria-label="Page navigation" className="d-flex justify-content-center my-3">
                    <ul className="pagination m-0">
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

function mapStateToProps(state, props) {
    const { location } = props;

    return {
        newsList: state.news.data.find((newsPage) => newsPage.route === location.pathname + location.search)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getNews: (payload) => dispatch(getNews(payload)),
        addToFavorites: (payload) => dispatch(addToFavorites(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
