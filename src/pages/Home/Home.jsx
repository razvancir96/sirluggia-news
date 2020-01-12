import React, { useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/newsActions';
import { Link } from 'react-router-dom';

function Home(props) {

    const {getNews, newsList, history, location} = props;

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

    return (
        <Layout>
            <div>
                <h1>HOME</h1>
                { newsList
                    && newsList.map(news => (
                        <Link to={`/article/${news.id}`} key={news.id}>
                            <div>
                                <h2>{news.pillarName} - {news.sectionName}</h2>
                                <h3>{news.webTitle}</h3>
                            </div>
                        </Link>
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
        getNews: (payload) => dispatch(getNews(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
