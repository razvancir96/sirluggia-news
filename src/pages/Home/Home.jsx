import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/newsActions';

function Home(props) {

    const {getNews, newsList} = props;

    const [page, setPage] = useState(1);

    useEffect(() => {
        getNews({page});
    }, [page, getNews]);

    function goToPage(page) {
        setPage(page);
        getNews({page});
    }

    return (
        <Layout>
            <div>
                <h1>HOME</h1>
                { newsList
                    && newsList.map(news => (
                        <div key={news.id}>
                            <h2>{news.pillarName} - {news.sectionName}</h2>
                            <h3>{news.webTitle}</h3>
                        </div>
                    ))
                }
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={'page-item ' + (page === 1 ? 'active' : '')}>
                            <button className="page-link" onClick={() => goToPage(1)}>
                                1
                            </button>
                        </li>
                        <li className={'page-item ' + (page === 2 ? 'active' : '')}>
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
